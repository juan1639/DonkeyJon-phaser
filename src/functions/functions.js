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

export {
    crear_nuevoBarril,
    imagen_grupoBarriles,
    getSettings_json
};
