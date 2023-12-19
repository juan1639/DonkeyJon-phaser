// =========================================================================================
//  D O N K E Y - J O N  4
// 
// -----------------------------------------------------------------------------------------
import { loader } from './loader.js';
import { Jugador } from '../components/jugador.js';
import { Marcador } from '../components/marcador.js';
import { Plataforma } from '../components/plataforma.js';
import { Barril } from '../components/barril.js';

const WIDTH = 800;
const HEIGHT = 550;

// --------------------------------------------------------------
export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {
    this.plataforma = new Plataforma(this);
    this.jugador = new Jugador(this);
    this.barril = new Barril(this);
    this.marcador = new Marcador(this);
  }

  preload() {
    loader(this);
  }

  create() {

    const yBounds = 3;
    this.imagenes_fondo(WIDTH, HEIGHT, yBounds);

    // this.gameoverImage = this.add.image(400, 90, 'gameover');
    // this.gameoverImage.visible = false;
    
    this.cameras.main.setBounds(0, 0, Math.floor(WIDTH * 2), Math.floor(HEIGHT * yBounds));
    this.physics.world.setBounds(0, 0, Math.floor(WIDTH * 2), Math.floor(HEIGHT * yBounds));

    this.plataforma.create();
    this.jugador.create();
    this.barril.create();
    this.marcador.create();

    this.cameras.main.startFollow(this.barril.get());
    // this.cameras.main.followOffset.set(0, 0);

    this.physics.add.collider(this.barril.get(), this.plataforma.get(), (barril, plataforma) => {

      barril.setAcceleration(barril.getData('acel') * plataforma.getData('id'));
      barril.setData('rotacion', plataforma.getData('id'));

    }, null, this);

    this.physics.add.collider(this.jugador.get(), this.plataforma.get(), () => {return;}, (jugador) => {

      if (jugador.body.velocity.y < 0) return false;
      return true;
      
    }, this);

    // this.physics.add.collider(this.jugador.get(), this.laberinto.get(), (jug, plat) => {console.log(jug.body.touching.right);});
    /* this.physics.add.collider(this.jugador.get(), this.laberinto.get(), (jugador, laberinto) => {
      console.log(jugador.touching.up);
    }); */
  }

  // ================================================================
  update() {

    this.jugador.update();
    this.barril.update();
    this.marcador.update(this.jugador.get().x, this.jugador.get().y);
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
}
