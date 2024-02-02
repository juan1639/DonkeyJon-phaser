import { play_sonidos } from "../functions/functions.js";
import { Settings } from "../scenes/settings.js";

// ==================================================================================
export class BotonNuevaPartida {

  // --------------------------------------------------------
  constructor(scene) {
    this.relatedScene = scene;
  }

  create(siguienteScene) {

    this.sonidoMenuSelect = this.relatedScene.sound.add('moneda-mario');

    const ancho = this.relatedScene.sys.game.config.width;
    const alto = this.relatedScene.sys.game.config.height;
    const botonCondicional = Settings.getNivel() > 1 ? 'boton-continuar' : 'boton-nueva-partida';

    this.boton = this.relatedScene.add.sprite(Math.floor(ancho / 2), Math.floor(alto / 1.5), botonCondicional).setInteractive();
    this.boton.setScale(0.6);
    this.boton.setAngle(1);

    this.boton.on('pointerover', () => {
      // this.boton.setFrame(1);
      this.boton.setScale(0.7);
    });
    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(0.6);
    });
    this.boton.on('pointerdown', () => {

      if (siguienteScene === 'prenivel' && Settings.getNivel() <= 1) {
        this.relatedScene.sonidoMarioTuberias.pause();
      }

      play_sonidos(this.sonidoMenuSelect, false, 0.9);
      this.relatedScene.scene.start(siguienteScene);
    });

    this.relatedScene.tweens.add({
      targets: this.boton,
      angle: 359,
      ease: 'Elastic',
      yoyo: true,
      hold: 2000,
      duration: 3000,
      repeat: -1
    });
  }
}

// ==================================================================================
export class BotonSettings {

  // --------------------------------------------------------
  constructor(scene) {
    this.relatedScene = scene;
  }

  create(siguienteScene) {

    const ancho = this.relatedScene.sys.game.config.width;
    const alto = this.relatedScene.sys.game.config.height;
    this.boton = this.relatedScene.add.sprite(Math.floor(ancho / 2), Math.floor(alto / 1.1), 'boton-settings').setInteractive();
    this.boton.setScale(0.5);
    this.boton.setAngle(0);

    this.boton.on('pointerover', () => {
      // this.boton.setFrame(1);
      this.boton.setScale(0.6);
    });
    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(0.5);
    });
    this.boton.on('pointerdown', () => {
      if (siguienteScene === 'prenivel') this.relatedScene.sonidoMarioTuberias.pause();
      this.relatedScene.scene.start(siguienteScene);
    });

    this.relatedScene.tweens.add({
      targets: this.boton,
      y: Math.floor(alto / 1), 
      ease: 'Sine.easeIn',
      yoyo: true,
      duration: 2700,
      repeat: -1
    });
  }
}

// ==================================================================================
export class BotonFullScreen {

  // --------------------------------------------------------
  constructor(scene, direccion) {
    this.relatedScene = scene;
    this.direccion = direccion;
  }

  create() {

    const ancho = this.relatedScene.sys.game.config.width;
    const alto = this.relatedScene.sys.game.config.height;

    this.boton = this.relatedScene.add.image(this.direccion.x, this.direccion.y, this.direccion.id).setInteractive();
    this.boton.setScale(this.direccion.scX, this.direccion.scY).setAngle(this.direccion.ang).setFrame(0).setDepth(4);
    this.boton.setX(this.direccion.x).setY(this.direccion.y);

    this.boton.on('pointerover', () => {
      // this.boton.setFrame(1);
      this.boton.setScale(this.direccion.scX + 0.1, this.direccion.scY + 0.1);
    });
    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(this.direccion.scX, this.direccion.scY);
    });

    this.boton.on('pointerdown', () => {
      if (!this.relatedScene.scale.isFullscreen) {
        this.relatedScene.scale.startFullscreen();
      } else {
        this.relatedScene.scale.stopFullscreen();
      }
    });
  }
}
