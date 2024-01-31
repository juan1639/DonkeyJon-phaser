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
import { Textos } from '../components/textos.js';
// import { Marcador } from '../components/marcador.js';
import { Settings } from './settings.js';

// ================================================================================
export class PreNivel extends Phaser.Scene {

    // -------------------------------------------------
    constructor() {
        super({ key: 'prenivel' });
    }

    init() {

        Settings.setNivelSuperado(false);

        this.array_barril = [];
        this.crearNuevoBarril = false;
        this.barrilIndex = 0;

        this.decorativos = new Decorativos(this);
        this.plataforma = new Plataforma(this);
        this.escalera = new Escalera(this);
        this.array_barril.push(new Barril(this));
        this.enemigo = new Enemigo(this);
        this.txt = new Textos(this);
        // this.marcador = new Marcador(this);
    }

    create() {

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

        const left = Math.floor(this.sys.game.config.width / 3.2);
        const top = Math.floor(this.sys.game.config.height / 3);

        this.txt.create({
            x: left, y: top, texto: ' Nivel ' + Settings.getNivel(),
            size: 70, style: 'bold', oofx: 1, offy: 1, col: '#e81', blr: 15,
            fillShadow: true, fll: '#ff9', family: 'verdana, arial, sans-serif',
            screenWidth: this.sys.game.config.width, multip: 1
        });
        
        this.txt.get().setAlpha(1);

        this.tweens.add({
            targets: this.txt.get(),
            alpha: 0,
            // yoyo: true,
            ease: 'Sine.easeIn',
            duration: Math.floor(duracionThisScene / 1),
            // repeat: 1
        });

        this.tweens.add({
            targets: this.txt.get(),
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
    }

    update() {
        
        crear_nuevoBarril(this);

        this.enemigo.update();
        this.array_barril.forEach(barril => barril.update());
    }
}
