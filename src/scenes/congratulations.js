import { BotonNuevaPartida } from "../components/boton-nuevapartida.js";
import { Plataforma } from "../components/plataforma.js";
import { imagenes_fondo } from "../functions/functions.js";

// =====================================================================
export class Congratulations extends Phaser.Scene {
  constructor() {
    super({ key: 'congratulations' });
  }

  init() {
    this.plataforma = new Plataforma(this);
    this.botoninicio = new BotonNuevaPartida(this);
  }

  create() {

    const yBounds = 3;
    imagenes_fondo(this.sys.game.config.width, this.sys.game.config.height, yBounds, this);

    this.plataforma.create();
    this.botoninicio.create('prenivel');
  }
}
