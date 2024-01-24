// =========================================================================================
//  D O N K E Y - J O N  4
// 
// -----------------------------------------------------------------------------------------
import { loader } from './loader.js';
import { Jugador } from '../components/jugador.js';
import { Enemigo } from '../components/enemigo.js';
import { Marcador } from '../components/marcador.js';
import { Plataforma } from '../components/plataforma.js';
import { Escalera } from '../components/escalera.js';
import { Barril } from '../components/barril.js';

import {
  crear_nuevoBarril,
  imagen_grupoBarriles,
  getSettings_json
} from '../functions/functions.js';

// --------------------------------------------------------------
export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {
    this.array_barril = [];
    this.crearNuevoBarril = false;
    this.barrilIndex = 0;
    
    this.plataforma = new Plataforma(this);
    this.escalera = new Escalera(this);
    this.jugador = new Jugador(this);
    this.enemigo = new Enemigo(this);
    this.array_barril.push(new Barril(this));
    this.marcador = new Marcador(this);
  }

  preload() {
    loader(this);
  }

  create() {

    //getSettings_json(this);

    const yBounds = 3;
    this.imagenes_fondo(this.sys.game.config.width, this.sys.game.config.height, yBounds);

    this.grupoBarriles = [];
    imagen_grupoBarriles(this);

    this.cameras.main.setBounds(0, 0, Math.floor(this.sys.game.config.width * 2), Math.floor(this.sys.game.config.height * yBounds));
    this.physics.world.setBounds(0, 0, Math.floor(this.sys.game.config.width * 2), Math.floor(this.sys.game.config.height * yBounds));

    this.plataforma.create();
    this.escalera.create();
    this.jugador.create();
    this.enemigo.create();
    this.array_barril[this.barrilIndex].create(this.barrilIndex, this.plataforma, this.enemigo);
    this.marcador.create();

    this.mouse_showXY = {
      create: this.add.text(this.jugador.get().x, this.jugador.get().y - 100, '.', { fill: '#111' }),
      show_mouseXY: true
    }

    this.cameras.main.startFollow(this.jugador.get());
    // this.cameras.main.followOffset.set(0, 0);
    
    this.crear_colliders();
  }
  
  // ================================================================
  update() {

    this.pointer_showXY(this.mouse_showXY);

    crear_nuevoBarril(this);

    this.jugador.update();
    this.enemigo.update();
    this.array_barril.forEach(barril => barril.update());

    this.marcador.update(this.jugador.get().x, this.jugador.get().y);
  }

  // ================================================================
  crear_colliders() {

    this.physics.add.collider(this.grupoBarriles, this.plataforma.get());

    this.physics.add.collider(this.jugador.get(), this.plataforma.get(), () => {return}, (jugador) => {

      if (jugador.body.velocity.y < 0) return false;
      return true;
      
    }, this);
    
    this.physics.add.collider(this.enemigo.get(), this.plataforma.get(), (enemigo, plataforma) => {

      //console.log(plataforma.getData('index'), plataforma.getData('ultima'));

      if (plataforma.getData('index') !== plataforma.getData('ultima')) {

        enemigo.setVelocityX(enemigo.getData('vel-x') * plataforma.getData('id'));
        enemigo.setFlip(enemigo.body.velocity.x < 0 ? true : false);
      }
    }, null, this);
  }

  // ================================================================
  imagenes_fondo(WIDTH, HEIGHT, yBounds) {
    
    for (let i = 0; i < yBounds; i ++) {
      
      let iFondo = '';
      
      if (i % 2 === 0) {iFondo = '01';} else {iFondo = '23';}
      
      this.add.image(WIDTH / 2, HEIGHT / 2 + i * HEIGHT, 'fondo' + iFondo[0]);
      this.add.image(WIDTH / 2 + WIDTH, HEIGHT / 2 + i * HEIGHT, 'fondo' + iFondo[1]);
    }
  }

  // ================================================================
  pointer_showXY({create, show_mouseXY}) {
    
    if (!show_mouseXY) return;
    
    const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);
    
    create.setText([
      `x: ${pointer.worldX}`,
      `y: ${pointer.worldY}`
    ]).setX(this.jugador.get().x).setY(this.jugador.get().y - 170);
  }
}
