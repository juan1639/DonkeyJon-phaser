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
function collider_jugador_plataforma(scene) {

  scene.physics.add.collider(scene.jugador.get(), scene.plataforma.get(), (jugador, plataforma) => {

    if (plataforma.getData('trampa')) plataforma.body.setAllowGravity(true);
  
  }, (jugador, plataforma) => {

    // Si esta en modo Dies
    if (jugador.getData('jugadorDies')) return false;

    // Para que no colisione con la plataforma 'con la cabeza' al saltar
    if (jugador.body.velocity.y < 0) return false;

    // Para que se caiga de la plataforma mas o menos a la mitad de jugador.body.width
    if (jugador.body.velocity.y >= 0 && jugador.x - Math.floor(jugador.body.width / 2) > plataforma.x) return false;
    if (jugador.body.velocity.y >= 0 && jugador.x + Math.floor(jugador.body.width / 1.8) < plataforma.x) return false;

    return true;
  });
}

// ================================================================
function collider_enemigo_plataforma(scene) {

  scene.physics.add.collider(scene.enemigo.get(), scene.plataforma.get(), (enemigo, plataforma) => {

    //console.log(plataforma.getData('index'), plataforma.getData('ultima'));

    if (plataforma.getData('index') !== plataforma.getData('ultima')) {

      enemigo.setVelocityX(enemigo.getData('vel-x') * plataforma.getData('id'));
      enemigo.setFlip(enemigo.body.velocity.x < 0 ? true : false);
    }
  
  }, () => {

    if (Settings.isNivelSuperado()) return false;
    return true;
  });
}

// ================================================================
function overlap_jugador_switch(scene) {

  scene.physics.add.overlap(scene.jugador.get(), scene.switch.get(), (jugador, sw) => {

    // console.log('colision-switch');
    const left = scene.jugador.get().x - 240;
    const top = scene.jugador.get().y - 100;
    const screenW = scene.sys.game.config.width;

    if (!scene.txtObj.bool && !Settings.isNivelSuperado()) {
      console.log('texto creado');

      scene.txtObj.txtSwitch.create({
        x: left, y: top, texto: ' Pulse agachar para \n realizar una accion ',
        size: 30, style: 'bold', offx: 1, offy: 1, color: '#ff9', blr: 7,
        fillShadow: true, fll: '#c62', family: 'verdana, arial, sans-serif',
        screenWidth: screenW, multip: 2
      });

      scene.txtObj.bool = true;
    }

    setTimeout(() => {
      scene.txtObj.txtSwitch.get().destroy();
      scene.txtObj.bool = false;
    }, scene.txtObj.duracion);

    if ((scene.jugador.controles.down.isDown || scene.crucetadown.isDown) && !scene.switch.pausa.pausa) {

      scene.switch.array_changes.forEach(cambiar => {

        if (sw.getData('key') === cambiar[0]) {
          sw.disableBody(true, true);
          scene.switch.changeItem(cambiar[0], sw.x, sw.y);
          scene.switch.pausaChange();
          play_sonidos(scene.sonidoSwitch, false, 0.9);
        }
      });
    }
  }, (jugador, sw) => {

    if (jugador.getData('disableBody')) return false;
    return true;

  });
}

// ================================================================
function overlap_jugador_enemigo(scene) {

  scene.physics.add.overlap(scene.jugador.get(), scene.enemigo.get(), (jugador, enemigo) => {

    setTimeout(() => play_sonidos(scene.sonidoUmph, false, 1.0), 700);
    play_sonidos(scene.sonidoOugh, false, 1.0);

    const left = enemigo.x - 50;
    const top = enemigo.y - 200;
    const screenW = scene.sys.game.config.width;

    if (!scene.txtObj.bool && !Settings.isNivelSuperado()) {

      scene.txtObj.txtSwitch.create({
        x: left, y: top, texto: ' Fuera de aqui! \n cacho subnormal! ',
        size: 55, style: 'bold', offx: 1, offy: 1, color: '#ffa', blr: 7,
        fillShadow: true, fll: '#e61', family: 'verdana, arial, sans-serif',
        screenWidth: screenW, multip: 2
      });

      scene.txtObj.bool = true;
    }

    revivir_jugador(jugador, scene);

    setTimeout(() => {
      scene.txtObj.txtSwitch.get().destroy();
      scene.txtObj.bool = false;
    }, scene.txtObj.duracion);
  
  }, (jugador, enemigo) => {

    if (
      jugador.getData('disableBody') ||
      jugador.alpha < 1 ||
      Settings.isNivelSuperado() ||
      Settings.getVidas() < 0
    ) return false;

    return true;
  });
}

// ================================================================
function overlap_jugador_pajaro(scene) {

  scene.physics.add.overlap(scene.jugador.get(), scene.pajaro.get(), (jugador, pajaro) => {

    setTimeout(() => play_sonidos(scene.sonidoUmph, false, 1.0), 700);
    play_sonidos(scene.sonidoOugh, false, 1.0);

    const left = scene.jugador.get().x - 110;
    const top = scene.jugador.get().y + 120;
    const screenW = scene.sys.game.config.width;

    scene.txt1.create({
      x: left, y: top, texto: ' Ouch! ', size: 70, style: 'bold',
      oofx: 1, offy: 1, col: '#ffa', blr: 15, fillShadow: true, fll: '#f31',
      family: 'verdana, arial, sans-serif', screenWidth: screenW, multip: 2
    });

    revivir_jugador(jugador, scene);
    revivir_pajaro(pajaro, scene);

    setTimeout(() => scene.txt1.get().destroy(), scene.txtObj.duracion);
  
  }, (jugador, pajaro) => {

    if (
      jugador.getData('disableBody') ||
      jugador.alpha < 1 ||
      Settings.getVidas() < 0 ||
      Settings.isNivelSuperado()
    ) return false;

    return true;
  });
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
    collider_jugador_plataforma,
    collider_enemigo_plataforma,
    overlap_jugador_switch,
    overlap_jugador_enemigo,
    overlap_jugador_pajaro,
    revivir_jugador,
    revivir_pajaro,
    nivel_superado,
    getSettings_json,
    centrar_txt,
    suma_puntos,
    restar_vida,
    play_sonidos
};
