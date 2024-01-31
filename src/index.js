import { Iniciar } from './scenes/iniciar.js';
import { MenuPrincipal } from './scenes/menuprincipal.js';
import { PreNivel } from './scenes/prenivel.js';
import { Game } from './scenes/game.js';
import { Congratulations } from './scenes/congratulations.js';
// import { Gameover } from './scenes/gameover.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 550,
  scene: [Iniciar, MenuPrincipal, PreNivel, Game, Congratulations],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 1500},
      debug: false
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  // audio: {
  //   disableWebAudio: true
  // }
}

var game = new Phaser.Game(config);
