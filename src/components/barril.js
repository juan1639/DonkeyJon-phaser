import { play_sonidos } from "../functions/functions.js";
import { Settings } from "../scenes/settings.js";

// =======================================================================
export class Barril {

    static INI_X = 200;
    static INI_Y = 200;

    static SCALE = 1;

    // --------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create(index, plataforma, enemigo) {
        
        this.sonidoMetalPunch = this.relatedScene.sound.add('metal-punch');

        this.barril = this.relatedScene.physics.add.sprite(Barril.INI_X, Barril.INI_Y, 'barril2');

        this.barril.setData('activo', false);
        this.barril.setData('rotacion', -1);
        this.barril.setData('acel', 130);
        this.barril.setData('id', index);

        this.barril.setCollideWorldBounds(true).setBounceY(0.5).setAngle(120).setActive(true);

        this.relatedScene.physics.add.collider(this.barril, plataforma.get(), (barril, plataforma) => {

            if (barril.getData('activo')) {
                
                barril.setAcceleration(barril.getData('acel') * plataforma.getData('id'));
                barril.setData('rotacion', plataforma.getData('id'));

                if (plataforma.getData('trampa')) plataforma.body.setAllowGravity(true);
            }
        
        }, null, this.relatedScene);

        this.relatedScene.physics.add.collider(enemigo.get(), this.barril, (enemigo, barril) => {

            barril.setData('activo', true);
            enemigo.anims.play('enemy-kick', true);
            play_sonidos(this.sonidoMetalPunch, false, 0.3);
      
            setTimeout(() => {
              enemigo.setFlip(true);
              enemigo.setVelocityX(-enemigo.getData('vel-x'));
              enemigo.anims.play('enemy-left-right', true);
              this.relatedScene.crearNuevoBarril = true;
            }, this.establecer_dificultad());
        
        }, () => {

            if (Settings.isNivelSuperado()) return false;
            return true;
        
        }, this);

        console.log(this.barril);
        console.log(this.barril.getData('rotacion'));
    }
    
    update() {

        if (this.barril.x <= 40 && this.barril.y >= this.relatedScene.sys.game.config.height * 3 - 100 && this.barril.active) {

            this.barril.destroy();
            Settings.setPuntos(Settings.getPuntos() + 100);
            this.relatedScene.marcadorPtos.update(' Puntos: ', Settings.getPuntos());
        }

        if (this.barril.getData('activo')) this.barril.rotation += 0.1 * this.barril.getData('rotacion');
        // console.log(this.barril.x);
    }

    establecer_dificultad() {

        if (Settings.getNivel() < 7) return Settings.getDificultadProgresiva()[Settings.getNivel()][0];

        return 500;
    }

    get() {
        return this.barril;
    }
}
