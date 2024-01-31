import { loader } from './loader.js';
import { Textos } from '../components/textos.js';
import { centrar_txt, play_sonidos } from '../functions/functions.js';
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
        Settings.setNivelSuperado(false);

        this.plataforma = new Plataforma(this);
        this.enemigo = new Enemigo(this);
        this.botoninicio = new BotonNuevaPartida(this);
        this.botonsettings = new BotonSettings(this);
        this.txt = new Textos(this);
    } 
    
    preload() {
        
        const txt = this.add.text(
            Math.floor(this.sys.game.config.width / 2), Math.floor(this.sys.game.config.height / 2),
            ' Cargando...', {
                fontSize: '50px',
                fill: '#ffa',
                fontFamily: 'verdana, arial, sans-serif'
            }
        );
        
        txt.setX(centrar_txt(txt, this.sys.game.config.width));
        
        loader(this);
    }
    
    create() {

        this.sonidoMarioTuberias = this.sound.add('mario-tuberias');

        const aparecerBoton = 3200;

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

        // -----------------------------------------------------------
        const left = Math.floor(this.sys.game.config.width / 5.2);
        const top = Math.floor(this.sys.game.config.height / 4.2);

        this.txt.create({
            x: left, y: top, texto: ' DonkeyJon ',
            size: 90, style: 'bold', oofx: 1, offy: 1, col: '#fff', blr: 15,
            fillShadow: true, fll: '#e81', family: 'verdana, arial, sans-serif',
            screenWidth: this.sys.game.config.width, multip: 1
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

        play_sonidos(this.sonidoMarioTuberias, false, 0.8);

        console.log(this.txt);
    }

    update() {

        if (this.enemigo.get().y > 450 && this.enemigo.get().x < 200) {

            this.enemigo.get().anims.play('enemy-left-right', false);
            this.enemigo.get().setVelocityX(0).setFrame(3);
        }
    }
}
