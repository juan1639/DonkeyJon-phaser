export function loader(scene) {

  // scene.load.json('settings', '../src/json/settings.json');

  scene.load.image('fondo0', './src/img/fondo_cielo102.png');
  scene.load.image('fondo1', './src/img/fondo_cielo104.png');
  scene.load.image('fondo2', './src/img/fondo_cielo101.png');
  scene.load.image('fondo3', './src/img/fondo_cielo103.png');

  scene.load.image('gameover', './src/img/gameover.png');

  scene.load.image('1', './src/img/tile1.png');
  scene.load.image('2', './src/img/tile2.png');
  scene.load.image('3', './src/img/tile3.png');

  scene.load.image('9', './src/img/escalera.png');

  scene.load.image('barril1', './src/img/barril1.png');
  scene.load.image('barril2', './src/img/barril2.png');

  scene.load.image('switch0', './src/img/switchRed_left.png');
  scene.load.image('switch1', './src/img/switchRed_mid.png');
  scene.load.image('switch2', './src/img/switchRed_right.png');

  scene.load.image('boton-nueva-partida', './src/img/boton-start.png');
  scene.load.image('boton-continuar', './src/img/boton-continuar.png');
  scene.load.image('boton-settings', './src/img/boton-config.png');
  scene.load.spritesheet('boton-fullscreen', './src/img/boton-fullscreen.png', {frameWidth: 64, frameHeight: 64});

  scene.load.image('cruceta-left', './src/img/left.png');
  scene.load.image('cruceta-right', './src/img/right.png');
  scene.load.image('boton-salto', './src/img/boton-salto-joystick.png');

  scene.load.spritesheet('jugador', './src/img/Ssheet_jugador.png', {frameWidth: 80, frameHeight: 110});
  scene.load.spritesheet('enemigo', './src/img/Ssheet_enemigo.png', {frameWidth: 80, frameHeight: 110});
}
