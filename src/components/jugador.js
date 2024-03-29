import { play_sonidos } from "../functions/functions.js";
import { Settings } from "../scenes/settings.js";

// =======================================================================
export class Jugador {

    // ------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.jugador = this.relatedScene.physics.add.sprite(200, this.relatedScene.sys.game.config.height * 3 - 200, 'jugador');

        this.jugador.setData('vel-x', 300);
        this.jugador.setData('vel-escalera', 200);
        this.jugador.setData('vel-salto', 640);
        this.jugador.setData('jugadorDies', false).setData('disableBody', false);
        this.jugador.setData('saveX', 0).setData('saveY', this.relatedScene.sys.game.config.height * 3 - 200);

        this.jugador.setAngle(0).setAlpha(1).setCollideWorldBounds(true);
        // this.jugador.setBounce(0.2);

        const datosAnim = [
            ['left', 9, 10],
            ['right', 9, 10],
            ['stairs', 5, 6],
            ['dies', 0, 4],
            ['superado', 7, 8]
        ];

        for (let i = 0; i < datosAnim.length; i ++) {

            this.relatedScene.anims.create({
                key: datosAnim[i][0], 
                frames: this.relatedScene.anims.generateFrameNumbers('jugador', {start: datosAnim[i][1], end: datosAnim[i][2]}),
                frameRate: 10,
                yoyo: true,
                repeat: -1
            });
        }

        const datosAnim2 = [
            ['turn', 0, 0],
            ['agachar', 3, 3]
        ];

        for (let i = 0; i < datosAnim2.length; i ++) {

            this.relatedScene.anims.create({
                key: datosAnim2[i][0],
                frames: [{key: 'jugador', frame: datosAnim2[i][1]}],
                frameRate: 20,
            });
        }

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        this.relatedScene.physics.add.overlap(this.jugador, this.relatedScene.escalera.get(), (jugador, escalera) => {

            if (this.controles.up.isDown || this.relatedScene.crucetaup.isDown) {
                
                jugador.setVelocityY(-this.jugador.getData('vel-escalera'));
                jugador.anims.play('stairs', true);
                console.log(jugador.x, escalera.x);
            }
        
        }, (jugador, escalera) => {

            if (jugador.x < escalera.x) return false;

        }, this);

        console.log(this.jugador);
    }

    update() {

        if (this.jugador.y > this.relatedScene.sys.game.config.height * 4) {

            this.jugador.setY(this.relatedScene.sys.game.config.height * 4);
        }
        
        if (this.jugador.getData('jugadorDies') || Settings.getVidas() < 0) return;

        if (Settings.isNivelSuperado()) {

            if (this.jugador.body.touching.down) {
                this.jugador.setVelocityY(-this.jugador.getData('vel-salto'));
                this.jugador.anims.play('superado');
            }

            return;
        }

        // ----------------------------------------------------------------
        if ((this.controles.space.isDown || this.relatedScene.botonsalto.isDown) && this.jugador.body.velocity.y === 0) {

            this.jugador.setVelocityY(-this.jugador.getData('vel-salto'));
            play_sonidos(this.relatedScene.sonidoSalto, false, 0.9);
        }

        this.controlesMobile_on_off();
        
        if (this.controles.left.isDown || this.relatedScene.crucetaleft.isDown) {

            this.jugador.setFlipX(true);
            this.jugador.setVelocityX(-this.jugador.getData('vel-x'));
            this.jugador.anims.play('left', true);
            
        } else if (this.controles.right.isDown || this.relatedScene.crucetaright.isDown) {

            this.jugador.setFlipX(false);
            this.jugador.setVelocityX(this.jugador.getData('vel-x'));
            this.jugador.anims.play('right', true);
        
        } else if (this.controles.down.isDown || this.relatedScene.crucetadown.isDown) {

            this.jugador.setVelocityX(0);
            this.jugador.anims.play('agachar', true);

        } else if (!this.controles.up.isDown && !this.relatedScene.crucetaup.isDown) {

            this.jugador.setVelocityX(0);
            this.jugador.anims.play('turn');
        }
    }

    controlesMobile_on_off() {

        if (this.controles.shift.isDown && this.relatedScene.crucetaleft.get().getData('on')) {

            this.relatedScene.add.timeline([
                {
                    at: 150,
                    run: () => {
                        this.relatedScene.crucetaleft.get().setVisible(false).setData('on', false);
                        this.relatedScene.crucetaright.get().setVisible(false);
                        this.relatedScene.crucetaup.get().setVisible(false);
                        this.relatedScene.crucetadown.get().setVisible(false);
                        this.relatedScene.botonsalto.get().setVisible(false);
                        play_sonidos(this.relatedScene.sonidoSwitch, false, 0.9);
                    }
                }
            ]).play();
        
        } else if (this.controles.shift.isDown && !this.relatedScene.crucetaleft.get().getData('on')) {

            this.relatedScene.add.timeline([
                {
                    at: 150,
                    run: () => {
                        this.relatedScene.crucetaleft.get().setVisible(true).setData('on', true);
                        this.relatedScene.crucetaright.get().setVisible(true);
                        this.relatedScene.crucetaup.get().setVisible(true);
                        this.relatedScene.crucetadown.get().setVisible(true);
                        this.relatedScene.botonsalto.get().setVisible(true);
                        play_sonidos(this.relatedScene.sonidoSwitch, false, 0.9);
                    }
                }
            ]).play();
        }
    }

    get() {
        return this.jugador;
    }
}

// =======================================================================
export class JugadorShowVidas {

    // ------------------------------------------------------------
    constructor(scene, args) {
        this.relatedScene = scene;
        this.args = args;
    }

    create() {

        const { xx, yy, scX, scY } = this.args;

        this.jugadorSV = this.relatedScene.add.group({
            key: 'jugador',
            setXY: { x: xx, y: yy, stepX: scX},
            repeat: Settings.getVidas() - 1
        });

        this.jugadorSV.children.iterate(vida => {
            vida.setScale(0.40, 0.50);
            vida.setAlpha(1);
        });

        console.log(this.jugadorSV);
    }

    get() {
        return this.jugadorSV;
    }
}
