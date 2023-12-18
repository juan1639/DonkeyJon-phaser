export function loader(scene) {

  scene.load.image('fondo0', './src/img/fondo_cielo102.png');
  scene.load.image('fondo1', './src/img/fondo_cielo104.png');
  scene.load.image('fondo2', './src/img/fondo_cielo101.png');
  scene.load.image('fondo3', './src/img/fondo_cielo103.png');

  scene.load.image('gameover', './src/img/gameover.png');

  scene.load.image('tile1', './src/img/blockGrey.png');

  scene.load.image('switch0', './src/img/switchRed_left.png');
  scene.load.image('switch1', './src/img/switchRed_mid.png');
  scene.load.image('switch2', './src/img/switchRed_right.png');

  scene.load.spritesheet('jugador', './src/img/Ssheet_jugador.png', {frameWidth: 80, frameHeight: 110});
}
