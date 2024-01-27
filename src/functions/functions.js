import { Barril } from "../components/barril.js";

// ================================================================
function crear_nuevoBarril(scene) {

    if (scene.crearNuevoBarril) {

      scene.crearNuevoBarril = false;
      scene.barrilIndex ++;

      scene.array_barril.push(new Barril(scene));
      scene.array_barril[scene.barrilIndex].create(scene.barrilIndex, scene.plataforma, scene.enemigo);
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
function revivir_jugador(jugador) {

  // console.log(jugador, barril, 'colision');
  jugador.setData('jugadorDies', true).setData('disableBody', true);
  jugador.setCollideWorldBounds(false);
  jugador.setData('saveX', jugador.x);
  jugador.setData('saveY', jugador.y - 99);
  jugador.anims.play('dies', true);

  setTimeout(() => {
    jugador.setData('jugadorDies', false).setData('disableBody', false);
    jugador.setAlpha(0.5).setCollideWorldBounds(true);
    jugador.x = jugador.getData('saveX');
    jugador.y = jugador.getData('saveY');
  }, 4800);

  setTimeout(() => jugador.setAlpha(1), 8400);
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

export {
    crear_nuevoBarril,
    imagen_grupoBarriles,
    imagenes_fondo,
    revivir_jugador,
    getSettings_json,
    centrar_txt,
    suma_puntos,
    restar_vida
};
