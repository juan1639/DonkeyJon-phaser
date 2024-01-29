import { Settings } from "../scenes/settings.js";
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
  jugador.setData('saveY', jugador.y - 200);
  jugador.anims.play('dies', true);

  setTimeout(() => {
    jugador.setData('jugadorDies', false).setData('disableBody', false);
    jugador.setAlpha(0.5).setCollideWorldBounds(true);
    jugador.x = jugador.getData('saveX');
    jugador.y = jugador.getData('saveY');
  }, 4800);

  setTimeout(() => jugador.setAlpha(Settings.cheatInvisible), 8400);
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
function textos(args, relatedScene) {

  const left = Math.floor(args[0]);
  const top = Math.floor(args[1]);
  
  const txt = relatedScene.add.text(left, top, args[2], {
      fontSize: args[3] + 'px',
      fontStyle: args[4],
      shadow: {
          offsetX: args[5],
          offsetY: args[6],
          color: args[7],
          blur: args[8],
          fill: args[9]
      },
      fill: args[10],
      fontFamily: args[11]
  });

  const noCentrar = [
    ' Ouch! ',
    ' Pulse agachar para realizar una accion '
  ];

  let salir = false;

  noCentrar.forEach(nocentres => {
    if (args[2] === nocentres) salir = true;
  });

  if (salir) return txt;

  // ------ A partir de aqui centra el txt --------------
  txt.setX(centrar_txt(txt, args[12] * args[13]));

  return txt;
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
    getSettings_json,
    textos,
    centrar_txt,
    suma_puntos,
    restar_vida,
    play_sonidos
};
