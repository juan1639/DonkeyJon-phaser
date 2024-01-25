import { Settings } from "../scenes/settings.js";

// ==================================================================================
export class BotonNuevaPartida {

  // --------------------------------------------------------
  constructor(scene) {
    this.relatedScene = scene;
  }

  create(siguienteScene) {

    const ancho = this.relatedScene.sys.game.config.width;
    const alto = this.relatedScene.sys.game.config.height;
    const botonCondicional = Settings.getNivel() > 1 ? 'boton-continuar' : 'boton-nueva-partida';

    this.boton = this.relatedScene.add.sprite(Math.floor(ancho / 2), Math.floor(alto / 1.5), botonCondicional).setInteractive();
    this.boton.setScale(0.6);
    this.boton.setAngle(1);

    this.boton.on('pointerover', () => {
      // this.boton.setFrame(1);
      this.boton.setScale(0.8);
    });
    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(0.6);
    });
    this.boton.on('pointerdown', () => {
    //   if (siguienteScene === 'prenivel') this.relatedScene.sonidoMusicaFondo.pause();
      this.relatedScene.scene.start(siguienteScene);
    });

    this.relatedScene.tweens.add({
      targets: this.boton,
      angle: 359,
      ease: 'Elastic',
      yoyo: true,
      hold: 900,
      duration: 2000,
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
      this.boton.setScale(0.8);
    });
    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(0.5);
    });
    this.boton.on('pointerdown', () => {
      if (siguienteScene === 'prenivel') this.relatedScene.sonidoMusicaFondo.pause();
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
  constructor(scene) {
    this.relatedScene = scene;
  }

  create() {

    const ancho = this.relatedScene.sys.game.config.width;
    const alto = this.relatedScene.sys.game.config.height;
    const escala = 0.5;
    const sizeXY = Math.floor((64 * escala) / 2);

    this.boton = this.relatedScene.add.sprite(Math.floor(ancho / 1.05), sizeXY, 'boton-fullscreen').setInteractive();
    this.boton.setScale(escala);
    this.boton.setAngle(0);
    this.boton.setFrame(0);

    this.boton.on('pointerover', () => {
      // this.boton.setFrame(1);
      this.boton.setScale(0.8);
    });
    this.boton.on('pointerout', () => {
      // this.boton.setFrame(0);
      this.boton.setScale(escala);
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
