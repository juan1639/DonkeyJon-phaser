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

export {
    crear_nuevoBarril,
    imagen_grupoBarriles
};
