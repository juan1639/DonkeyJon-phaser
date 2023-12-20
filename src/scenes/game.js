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

const WIDTH = 800;
const HEIGHT = 550;

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

    const yBounds = 3;
    this.imagenes_fondo(WIDTH, HEIGHT, yBounds);

    this.grupoBarriles = [];
    this.imagen_grupoBarriles();

    // this.gameoverImage = this.add.image(400, 90, 'gameover');
    // this.gameoverImage.visible = false;
    
    this.cameras.main.setBounds(0, 0, Math.floor(WIDTH * 2), Math.floor(HEIGHT * yBounds));
    this.physics.world.setBounds(0, 0, Math.floor(WIDTH * 2), Math.floor(HEIGHT * yBounds));

    this.plataforma.create();
    this.escalera.create();
    this.jugador.create();
    this.enemigo.create();
    this.array_barril[this.barrilIndex].create(this.barrilIndex, this.plataforma, this.enemigo);
    this.marcador.create();

    this.text1 = this.add.text(this.jugador.get().x, this.jugador.get().y - 100, '.', { fill: '#aa3000' });

    this.cameras.main.startFollow(this.jugador.get());
    // this.cameras.main.followOffset.set(0, 0);
    
    this.crear_colliders();
  }
  
  // ================================================================
  update() {

    // const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);

    /* this.text1.setText([
      `x: ${pointer.worldX}`,
      `y: ${pointer.worldY}`
    ]); */

    this.crear_nuevoBarril();

    this.jugador.update();
    this.enemigo.update();
    this.array_barril.forEach(barril => barril.update());

    this.marcador.update(this.jugador.get().x, this.jugador.get().y);
  }

  // ================================================================
  crear_colliders() {

    this.physics.add.collider(this.grupoBarriles, this.plataforma.get());

    this.physics.add.collider(this.jugador.get(), this.plataforma.get(), () => {return;}, (jugador) => {

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
  crear_nuevoBarril() {

    if (this.crearNuevoBarril) {

      this.crearNuevoBarril = false;
      this.barrilIndex ++;

      this.array_barril.push(new Barril(this));
      this.array_barril[this.barrilIndex].create(this.barrilIndex, this.plataforma, this.enemigo);
    }
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
  imagen_grupoBarriles() {
    
    this.grupoBarriles.push(this.physics.add.group({
      key: 'barril1',
      frame: 0,
      quantity: 7,
      setXY:
      {
        x: 0,
        y: 0,
        stepX: 32,
        stepY: 0
      }
    }));
  }
}
