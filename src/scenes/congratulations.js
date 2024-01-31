import { BotonNuevaPartida } from "../components/boton-nuevapartida.js";
import { Plataforma } from "../components/plataforma.js";
import { imagenes_fondo } from "../functions/functions.js";
import { Textos } from "../components/textos.js";

// =====================================================================
export class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'congratulations' });
  }

  init() {
    this.plataforma = new Plataforma(this);
    this.botoninicio = new BotonNuevaPartida(this);
    this.txt = new Textos(this);
  }

  create() {

    const yBounds = 3;
    imagenes_fondo(this.sys.game.config.width, this.sys.game.config.height, yBounds, this);

    this.plataforma.create();
    this.botoninicio.create('prenivel');

    const left = Math.floor(this.sys.game.config.width / 5.2);
    const top = Math.floor(this.sys.game.config.height / 4.2);

    this.txt.create({
      x: left, y: top, texto: ' Siguiente Nivel ',
      size: 82, style: 'bold', oofx: 1, offy: 1, col: '#fff', blr: 15,
      fillShadow: true, fll: '#be2', family: 'verdana, arial, sans-serif',
      screenWidth: this.sys.game.config.width, multip: 1
    });
  }
}
