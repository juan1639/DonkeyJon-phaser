import {
    centrar_txt,
    crear_nuevoBarril,
    imagen_grupoBarriles,
    imagenes_fondo
} from '../functions/functions.js';

import { Plataforma } from '../components/plataforma.js';
import { Escalera } from '../components/escalera.js';
import { Barril } from '../components/barril.js';
import { Enemigo } from '../components/enemigo.js';
import { Decorativos } from '../components/decorativos.js';
// import { Marcador } from '../components/marcador.js';
import { Settings } from './settings.js';

// ================================================================================
export class PreNivel extends Phaser.Scene {

    // -------------------------------------------------
    constructor() {
        super({ key: 'prenivel' });
    }

    init() {

        this.array_barril = [];
        this.crearNuevoBarril = false;
        this.barrilIndex = 0;

        this.decorativos = new Decorativos(this);
        this.plataforma = new Plataforma(this);
        this.escalera = new Escalera(this);
        this.array_barril.push(new Barril(this));
        this.enemigo = new Enemigo(this);
        // this.marcador = new Marcador(this);
    }

    create() {
        
        // this.sonidoGalaxian = this.sound.add('sonidoGalaxian');

        const yBounds = 3;
        imagenes_fondo(this.sys.game.config.width, this.sys.game.config.height, yBounds, this);

        this.grupoBarriles = [];
        imagen_grupoBarriles(this);

        this.decorativos.create();
        this.plataforma.create();
        this.escalera.create();
        this.enemigo.create();
        this.array_barril[this.barrilIndex].create(this.barrilIndex, this.plataforma, this.enemigo);
        // this.marcador.create();

        this.cameras.main.setBounds(0, 0, Math.floor(this.sys.game.config.width * 2), Math.floor(this.sys.game.config.height * yBounds));
        this.physics.world.setBounds(0, 0, Math.floor(this.sys.game.config.width * 2), Math.floor(this.sys.game.config.height * yBounds));

        this.cameras.main.pan(Math.floor(this.sys.game.config.width / 2), this.sys.game.config.height * 3, 5500, 'Quad.easeIn');

        this.physics.add.collider(this.enemigo.get(), this.plataforma.get(), (enemigo, plataforma) => {

            //console.log(plataforma.getData('index'), plataforma.getData('ultima'));
      
            if (plataforma.getData('index') !== plataforma.getData('ultima')) {
      
              enemigo.setVelocityX(enemigo.getData('vel-x') * plataforma.getData('id'));
              enemigo.setFlip(enemigo.body.velocity.x < 0 ? true : false);
            }
        }, null, this);
        
        this.physics.add.collider(this.grupoBarriles, this.plataforma.get());

        // -----------------------------------------------------------
        const duracionThisScene = 5900;

        this.size = 70;
        this.left = Math.floor(this.sys.game.config.width / 3.2);
        this.top = Math.floor(this.sys.game.config.height / 3);
        
        this.txt_titulo = this.add.text(this.left, this.top, ' Nivel ' + Settings.getNivel(), {
            fontSize: this.size + 'px',
            fontStyle: 'bold',
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#e81',
                blur: 15,
                fill: true
            },
            fill: '#ff9',
            fontFamily: 'verdana, arial, sans-serif'
        });

        this.txt_titulo.setAlpha(1);
        this.txt_titulo.setX(centrar_txt(this.txt_titulo, this.sys.game.config.width));

        this.tweens.add({
            targets: this.txt_titulo,
            alpha: 0,
            // yoyo: true,
            ease: 'Sine.easeIn',
            duration: Math.floor(duracionThisScene / 1),
            // repeat: 1
        });

        this.tweens.add({
            targets: this.txt_titulo,
            y: 1200,
            duration: Math.floor(duracionThisScene),
            // repeat: 1
        });

        this.timeline = this.add.timeline([
            {
                at: duracionThisScene,
                run: () => {
                    // this.sonidoGalaxian.pause(),
                    this.scene.start('game')
                }
            }
        ]);

        this.timeline.play();
        // this.sonidoGalaxian.play();
        // this.sonidoGalaxian.volume = 0.5;
    }

    update() {
        
        crear_nuevoBarril(this);

        this.enemigo.update();
        this.array_barril.forEach(barril => barril.update());
    }
}
