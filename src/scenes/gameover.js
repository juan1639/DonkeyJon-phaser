import { BotonNuevaPartida } from "../components/boton-nuevapartida.js";
import { Plataforma } from "../components/plataforma.js";
import { Textos } from "../components/textos.js";
import { imagenes_fondo, play_sonidos } from "../functions/functions.js";

// ===========================================================================
export class Gameover extends Phaser.Scene {

  constructor() {
    super({ key: 'gameover' });
  }

  init() {
    this.botoninicio = new BotonNuevaPartida(this);
    this.plataforma = new Plataforma(this);
    this.txt = new Textos(this);

    this.sonidoGameOver = this.sound.add('gameover');
    this.sonidoGameOverRetro = this.sound.add('gameover-retro');
  }
  
  create() {

    play_sonidos(this.sonidoGameOverRetro, false, 0.6);

    const aparecerBoton = 2500;

    const yBounds = 3;
    imagenes_fondo(this.sys.game.config.width, this.sys.game.config.height, yBounds, this);

    this.plataforma.create();

    const left = Math.floor(this.sys.game.config.width / 5.2);
    const top = Math.floor(this.sys.game.config.height / 4.2);

    this.txt.create({
      x: left, y: top, texto: ' Game Over ',
      size: 82, style: 'bold', oofx: 1, offy: 1, col: '#fff', blr: 15,
      fillShadow: true, fll: '#e71', family: 'verdana, arial, sans-serif',
      screenWidth: this.sys.game.config.width, multip: 1
    });
    
    this.add.timeline([
      {
        at: aparecerBoton,
        run: () => {
            this.botoninicio.create('menuprincipal');
            play_sonidos(this.sonidoGameOver, false, 0.9);
        }
      }
    ]).play();
  }
}
