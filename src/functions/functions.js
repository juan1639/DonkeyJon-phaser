import { Settings } from "../scenes/settings.js";
import { Barril } from "../components/barril.js";
import { Textos } from "../components/textos.js";

// ================================================================
function crear_nuevoBarril(scene) {

    if (scene.crearNuevoBarril && !Settings.isNivelSuperado()) {

      scene.crearNuevoBarril = false;
      scene.barrilIndex ++;

      scene.array_barril.push(new Barril(scene));
      scene.array_barril[scene.barrilIndex].create(scene.barrilIndex, scene.plataforma, scene.enemigo);
      console.log(scene.array_barril);
    }
}

// ================================================================
function imagen_grupoBarriles(scene) {
    
    scene.grupoBarriles.push(scene.physics.add.group({
      key: 'barril1',
      frame: 0,
      quantity: 7,
      setXY:
      {
        x: 0,
        y: 0,
        stepX: 32,
        stepY: 0
      }
    }));
}

// ================================================================
function imagenes_fondo(WIDTH, HEIGHT, yBounds, scene) {
    
  for (let i = 0; i < yBounds; i ++) {
    
    let iFondo = '';
    
    if (i % 2 === 0) {iFondo = '01';} else {iFondo = '23';}
    
    scene.add.image(WIDTH / 2, HEIGHT / 2 + i * HEIGHT, 'fondo' + iFondo[0]);
    scene.add.image(WIDTH / 2 + WIDTH, HEIGHT / 2 + i * HEIGHT, 'fondo' + iFondo[1]);
  }

  scene.add.image(0, HEIGHT * 3, 'fondo2').setOrigin(0, 0);
  scene.add.image(WIDTH, HEIGHT * 3, 'fondo1').setOrigin(0, 0);
}

// ================================================================
function revivir_jugador(jugador, scene) {

  const {cheatInvisible, duracionInvisible, duracionDie} = Settings.invisible;

  restar_vida();
  if (Settings.getVidas() >= 0) scene.jugadorSV.get().getChildren()[Settings.getVidas()].setVisible(false);

  jugador.setData('jugadorDies', true).setData('disableBody', true);
  jugador.setCollideWorldBounds(false);
  jugador.setData('saveX', jugador.x);
  jugador.setData('saveY', jugador.y - 250);
  jugador.anims.play('dies', true);

  scene.add.timeline([
    {
      at: duracionDie,
      run: () => {
        jugador.setData('jugadorDies', false).setData('disableBody', false);
        jugador.setAlpha(0.5).setCollideWorldBounds(true);
        jugador.setX(jugador.getData('saveX'));
        jugador.setY(jugador.getData('saveY'));
        
        if (Settings.getVidas() < 0) jugador.setAlpha(0);
      }
    },
    {
      at: duracionInvisible,
      run: () => {
        if (Settings.getVidas() < 0) {
          jugador.setAlpha(0);
        } else {
          jugador.setAlpha(cheatInvisible);
        }
      }
    },
    {
      at: 10500,
      run: () => {
        if (Settings.getVidas() < 0) {
          scene.sonidoMusicaFondo.pause();
          scene.scene.start('gameover');
        }
      }
    }
  ]).play();
}

// ================================================================
function revivir_pajaro(pajaro, scene) {

  const {duracionDie} = Settings.invisible;

  pajaro.setCollideWorldBounds(false);
  pajaro.setVelocityY(pajaro.getData('vel-y') * 3);
  
  scene.tweens.add({
    targets: pajaro,
    angle: 359,
    ease: 'easeOut',
    repeat: 2
  });

  setTimeout(() => {
    pajaro.setCollideWorldBounds(true);
    pajaro.setVelocityY(pajaro.getData('vel-y'));
    pajaro.setX(Phaser.Math.Between(100, 1500));
    pajaro.setY(Phaser.Math.Between(500, 900));

    if (pajaro.body.velocity.x > 0) {
      pajaro.setFlipX(true);
    } else {
      pajaro.setFlipX(false);
    }
  }, duracionDie);
}

// ================================================================
function nivel_superado(scene) {

  if (Settings.isNivelSuperado()) return;

  console.log('nivel superado!');
  Settings.setNivelSuperado(true);

  const txt1 = new Textos(scene);

  const left = scene.jugador.get().x - 110;
  const top = scene.jugador.get().y - 140;
  const screenW = scene.sys.game.config.width;

  txt1.create({
    x: left, y: top, texto: ' Nivel Superado! ', size: 75, style: 'bold',
    oofx: 1, offy: 1, col: '#ffa', blr: 15, fillShadow: true, fll: '#fa2',
    family: 'verdana, arial, sans-serif', screenWidth: screenW, multip: 1
  });

  play_sonidos(scene.sonidoLevelUp, false, 0.9);
  scene.sonidoMusicaFondo.volume = 0.1;

  scene.add.timeline([
    {
      at: Settings.invisible.duracionDie,
      run: () => {
        txt1.get().destroy();
        scene.sonidoMusicaFondo.volume = 0.7;
      }
    },
    {
      at: Settings.invisible.duracionInvisible,
      run: () => {
        scene.sonidoMusicaFondo.pause();
        Settings.setNivel(Settings.getNivel() + 1);
        scene.scene.start('congratulations');
      }
    }
  ]).play();
}

// ================================================================
function getSettings_json(scene) {

  const data = scene.cache.json.get('settings');
  console.log(data);

  Object.keys(data).forEach(key => {

    Object.entries(data[key]).forEach(valores => {

      if (key === 'image') {

        scene.load.image(valores[0].toString(), valores[1].toString());
        console.log(valores[0].toString(), valores[1].toString());
      }

      if (key === 'spriteSheet') {

        scene.load.spritesheet(
          valores[0].toString(),
          valores[1][0].toString(),
          {frameWidth: 80, frameHeight: 110}
        );
        console.log(valores[0].toString(), valores[1][0], valores[1][1]);
      }
    });
  });
}

// =================================================================================
function centrar_txt(texto, anchoScreen) {
  
  console.log(texto.width);
  return Math.floor(anchoScreen / 2 - texto.width / 2);
}

// =================================================================================
function suma_puntos(puntos) {
  
  const bonus = Settings.getPuntos() + puntos.getData('puntos');
  Settings.setPuntos(bonus);
  console.log(bonus, Settings.getPuntos());
}

// =================================================================================
function restar_vida() {
  
  const actualizar = Settings.getVidas() - 1;
  Settings.setVidas(actualizar);
}

// =================================================================================
function play_sonidos(id, loop, volumen) {

  id.volume = volumen;
  id.loop = loop;
  id.play();
}

export {
    crear_nuevoBarril,
    imagen_grupoBarriles,
    imagenes_fondo,
    revivir_jugador,
    revivir_pajaro,
    nivel_superado,
    getSettings_json,
    centrar_txt,
    suma_puntos,
    restar_vida,
    play_sonidos
};
