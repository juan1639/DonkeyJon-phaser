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
  
  scene.load.image('letrero-kenney', './src/img/Letrero_kenney.png');
  scene.load.image('letrero-creditos', './src/img/Letrero_creditos.png');
  scene.load.image('letrero-arlekin', './src/img/Letrero_Arlekin.png');
  scene.load.image('letrero-imi', './src/img/Letrero_IMI.png');
  scene.load.image('flecha-derecha', './src/img/signArrow_right.png');
  scene.load.image('letrero-exit', './src/img/signExit.png');
  scene.load.image('flecha-izquierda', './src/img/signArrow_left.png');
  scene.load.image('flecha-upde', './src/img/signArrow_TR.png');
  scene.load.image('flecha-arriba', './src/img/signArrow_up.png');

  // -------------------------------------------------------------------------
  scene.load.audio('musica-fondo', './src/audio/8-bit-arcade-1.mp3');
  scene.load.audio('dieT1', './src/audio/dieThrow1.ogg');
  scene.load.audio('dieT2', './src/audio/dieThrow2.ogg');
  scene.load.audio('fireworks', './src/audio/fireworks.mp3');
  scene.load.audio('salto', './src/audio/jumpbros.ogg');
  scene.load.audio('mario-tuberias', './src/audio/mario-tuberias.ogg');
  scene.load.audio('menu-select', './src/audio/menu-select.mp3');
  scene.load.audio('metal-punch', './src/audio/metal-punch.mp3');
  scene.load.audio('pacmanazules', './src/audio/pacmaneatinghost.ogg');
  scene.load.audio('moneda-mario', './src/audio/p-ping.mp3');
  scene.load.audio('ough', './src/audio/ough.mp3');
  scene.load.audio('umph', './src/audio/umph.mp3');
}
