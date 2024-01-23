import { Plataforma } from "./plataforma.js";

// =======================================================================
export class Jugador {

    static XY_INI = [0, Math.floor(Plataforma.HEIGHT * 3) - 200];
    static VEL_X = 300;
    static VEL_ESCALERA = 200;
    static VEL_SALTO = 640;

    // ------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.jugador = this.relatedScene.physics.add.sprite(Jugador.XY_INI[0], Jugador.XY_INI[1], 'jugador');

        this.jugador.setData('vel-x', Jugador.VEL_X);
        this.jugador.setData('vel-escalera', Jugador.VEL_ESCALERA);
        this.jugador.setData('vel-salto', Jugador.VEL_SALTO);
        this.jugador.setAngle(0);
        this.jugador.setCollideWorldBounds(true);
        // this.jugador.setBounce(0.2);

        this.relatedScene.anims.create({
            key: 'left', 
            frames: this.relatedScene.anims.generateFrameNumbers('jugador', {start: 9, end: 10}),
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });

        this.relatedScene.anims.create({
            key: 'right', 
            frames: this.relatedScene.anims.generateFrameNumbers('jugador', {start: 9, end: 10}),
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });

        this.relatedScene.anims.create({
            key: 'stairs', 
            frames: this.relatedScene.anims.generateFrameNumbers('jugador', {start: 5, end: 6}),
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });

        this.relatedScene.anims.create({
            key: 'turn',
            frames: [{key: 'jugador', frame: 0}],
            frameRate: 20,
        });

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        this.relatedScene.physics.add.overlap(this.jugador, this.relatedScene.escalera.get(), (jugador, escalera) => {

            if (this.controles.up.isDown) {
                
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
        
        if (this.controles.left.isDown) {
            this.jugador.setFlipX(true);
            this.jugador.setVelocityX(-this.jugador.getData('vel-x'));
            this.jugador.anims.play('left', true);
            
        } else if (this.controles.right.isDown) {
            this.jugador.setFlipX(false);
            this.jugador.setVelocityX(this.jugador.getData('vel-x'));
            this.jugador.anims.play('right', true);
            
        } else if (!this.controles.up.isDown) {
            this.jugador.setVelocityX(0);
            this.jugador.anims.play('turn');
        }
        
        if ((this.controles.shift.isDown || this.controles.space.isDown) && this.jugador.body.touching.down && this.jugador.body.velocity.y === 0) {
            this.jugador.setVelocityY(-this.jugador.getData('vel-salto'));
        }
    }

    get() {
        return this.jugador;
    }
}

