import { loader } from './loader.js';
import { centrar_txt } from '../functions/functions.js';
import { Settings } from './settings.js';
import { Plataforma } from '../components/plataforma.js';
import { Enemigo } from '../components/enemigo.js';
import { BotonNuevaPartida, BotonSettings } from '../components/boton-nuevapartida.js';

// =================================================================================
export class MenuPrincipal extends Phaser.Scene {

    // -------------------------------------------------
    constructor() {
        super({ key: 'menuprincipal' });
    }

    init() {

        Settings.setPuntos(0);
        Settings.setNivel(1);
        Settings.setVidas(3);

        this.plataforma = new Plataforma(this);
        this.enemigo = new Enemigo(this);
        this.botoninicio = new BotonNuevaPartida(this);
        this.botonsettings = new BotonSettings(this);
    } 

    preload() {
        const txt = this.add.text(Math.floor(this.sys.game.config.width / 2), Math.floor(this.sys.game.config.height / 2), ' Cargando...', {
            fontSize: '50px',
            fill: '#ffa',
            fontFamily: 'verdana, arial, sans-serif'
        });

        txt.setX(centrar_txt(txt, this.sys.game.config.width));

        loader(this);
    }
    
    create() {

        const aparecerBoton = 3200;

        // this.sonidoMusicaFondo = this.sound.add('sonidoMusicaFondo');

        this.add.image(0, 0, 'fondo2').setOrigin(0, 0);

        this.plataforma.create();
        this.enemigo.create();

        this.physics.add.collider(this.enemigo.get(), this.plataforma.get(), (enemigo, plataforma) => {

            //console.log(plataforma.getData('index'), plataforma.getData('ultima'));
      
            if (plataforma.getData('index') !== plataforma.getData('ultima')) {
      
              enemigo.setVelocityX(enemigo.getData('vel-x') * plataforma.getData('id'));
              enemigo.setFlip(enemigo.body.velocity.x < 0 ? true : false);
            }
        }, null, this);

        this.size = 90;
        this.left = Math.floor(this.sys.game.config.width / 5.2);
        this.top = Math.floor(this.sys.game.config.height / 4.2);
        
        this.txt_titulo = this.add.text(this.left, this.top, ' DonkeyJon ', {
            fontSize: this.size + 'px',
            fontStyle: 'bold',
            shadow: {
                offsetX: 1,
                offsetY: 1,
                fill: '#ffa',
                // color: '#e81',
                blur: 15,
                fill: true
            },
            // fill: '#ffa',
            color: '#e81',
            fontFamily: 'verdana, arial, sans-serif'
        });

        this.txt_titulo.setX(centrar_txt(this.txt_titulo, this.sys.game.config.width));

        this.tweens.add({
            targets: this.txt_titulo,
            scale: 1.2,
            x: 24,
            ease: 'Ease',
            yoyo: true,
            hold: 900,
            duration: 2000,
            repeat: -1
        });

        this.timeline = this.add.timeline([
            {
              at: aparecerBoton,
              run: () => {
                this.botoninicio.create('prenivel');
                this.botonsettings.create('prenivel');
              }
            }
        ]);
        
        this.timeline.play();

        // this.sonidoMusicaFondo.play();
        // this.sonidoMusicaFondo.volume = 0.4;

        console.log(this.txt_titulo);
    }

    update() {

        if (this.enemigo.get().y > 450 && this.enemigo.get().x < 200) {

            this.enemigo.get().anims.play('enemy-left', false);
            this.enemigo.get().setVelocityX(0).setFrame(3);
        }
    }
}
