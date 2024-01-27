// =========================================================================================
//  D O N K E Y - J O N  4
// 
// -----------------------------------------------------------------------------------------
import { loader } from './loader.js';
import { Settings } from './settings.js';
import { Plataforma } from '../components/plataforma.js';
import { Escalera } from '../components/escalera.js';
import { Jugador } from '../components/jugador.js';
import { Enemigo } from '../components/enemigo.js';
import { Barril } from '../components/barril.js';
import { Marcador } from '../components/marcador.js';
import { BotonSalto, CrucetaDireccion } from '../components/botonycruceta.js';
import { BotonFullScreen } from '../components/boton-nuevapartida.js';

import {
  crear_nuevoBarril,
  imagen_grupoBarriles,
  imagenes_fondo,
  revivir_jugador,
  getSettings_json
} from '../functions/functions.js';

// --------------------------------------------------------------
export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {
    
    this.array_barril = [];
    this.crearNuevoBarril = false;
    this.barrilIndex = 0;
    
    this.plataforma = new Plataforma(this);
    this.escalera = new Escalera(this);
    this.jugador = new Jugador(this);
    this.enemigo = new Enemigo(this);
    this.array_barril.push(new Barril(this));

    const ancho = this.sys.game.config.width;
    const alto = this.sys.game.config.height;

    this.marcadorPtos = new Marcador(this, { x: 10, y: -99, size: 35, txt: ' Puntos: ', color: '#fff', id: 0 });
    this.marcadorNivel = new Marcador(this, { x: Math.floor(ancho / 2), y: -99, size: 35, txt: ' Nivel: ', color: '#ff5', id: 1 });
    this.marcadorHi = new Marcador(this, { x: Math.floor(ancho / 1.1), y: -99, size: 35, txt: ' Record: ', color: '#fff', id: 2 });

    this.botonfullscreen = new BotonFullScreen(this, {
      id: 'boton-fullscreen', x: Math.floor(this.sys.game.config.width * 1.35), y: -77,
      ang: 0, scX: 0.5, scY: 0.5 
    });

    this.crucetaleft = new CrucetaDireccion(this, {
      id: 'cruceta-left',
      x: Settings.getCoorCruceta().x,
      y: Settings.getCoorCruceta().y,
      ang: 0,
      scX: Settings.getCoorCruceta().sizeX,
      scY: Settings.getCoorCruceta().sizeY
    });

    this.crucetaright = new CrucetaDireccion(this, {
      id: 'cruceta-right',
      x: Settings.getCoorCruceta().x + 340,
      y: Settings.getCoorCruceta().y,
      ang: 0,
      scX: Settings.getCoorCruceta().sizeX,
      scY: Settings.getCoorCruceta().sizeY
    });

    this.crucetaup = new CrucetaDireccion(this, {
      id: 'cruceta-left',
      x: Settings.getCoorCruceta().x + 175,
      y: Settings.getCoorCruceta().y - 60,
      ang: 90,
      scX: Settings.getCoorCruceta().sizeX - 0.9,
      scY: Settings.getCoorCruceta().sizeY + 0.1
    });

    this.crucetadown = new CrucetaDireccion(this, {
      id: 'cruceta-left',
      x: Settings.getCoorCruceta().x + 175,
      y: Settings.getCoorCruceta().y + 100,
      ang: 270,
      scX: Settings.getCoorCruceta().sizeX + 1,
      scY: Settings.getCoorCruceta().sizeY
    });

    this.botonsalto = new BotonSalto(this, {
      id: 'boton-salto',
      x: Settings.getCoorBotonSalto().x,
      y: Settings.getCoorBotonSalto().y,
      ang: 0,
      scX: Settings.getCoorBotonSalto().sizeX,
      scY: Settings.getCoorBotonSalto().sizeY
    });
  }

  preload() {
    loader(this);
  }

  create() {
    //getSettings_json(this);

    const yBounds = 3;
    imagenes_fondo(this.sys.game.config.width, this.sys.game.config.height, yBounds, this);

    this.grupoBarriles = [];
    imagen_grupoBarriles(this);

    // --- El +50 es para que se vean mejor los botones mobile al comienzo del juego
    this.cameras.main.setBounds(
      0, 0,
      Math.floor(this.sys.game.config.width * 2), Math.floor(this.sys.game.config.height * yBounds) + 50
    );

    this.physics.world.setBounds(
      0, 0,
      Math.floor(this.sys.game.config.width * 2), Math.floor(this.sys.game.config.height * yBounds) + 50
    );
    
    this.mapa_viewEnemigo = this.cameras.add(0, 0, 120, 50).setZoom(0.3).setName('view-enemigo');
    this.mapa_viewEnemigo.scrollX = 150;
    this.mapa_viewEnemigo.scrollY = 280;
    console.log(this.mapa_viewEnemigo);

    this.mapa_scores = this.cameras.add(120, 0, 680, 25).setZoom(0.6).setName('view-scores').setAlpha(0.7).setOrigin(0, 0);
    this.mapa_scores.scrollX = 0;
    this.mapa_scores.scrollY = -99;
    console.log(this.mapa_scores);

    this.mapa_controles = this.cameras.add(0, 400, 800, 200).setZoom(0.9).setName('view-controls').setAlpha(0.7).setOrigin(0, 0);
    this.mapa_controles.scrollX = 0;
    this.mapa_controles.scrollY = 2370;
    console.log(this.mapa_controles);

    // ---------------------------------------------------------------------
    this.plataforma.create();
    this.escalera.create();
    this.jugador.create();
    this.enemigo.create();
    this.array_barril[this.barrilIndex].create(this.barrilIndex, this.plataforma, this.enemigo);

    // ---------------------------------------------------------------------
    this.marcadorPtos.create();
    this.marcadorNivel.create();
    this.marcadorHi.create();
    this.botonfullscreen.create();

    this.crucetaleft.create();
    this.crucetaright.create();
    this.crucetaup.create();
    this.crucetadown.create();
    this.botonsalto.create();
    
    this.mouse_showXY = {
      create: this.add.text(this.jugador.get().x, this.jugador.get().y - 100, '.', { fill: '#111' }),
      show_mouseXY: true
    }

    this.cameras.main.startFollow(this.jugador.get());
    // this.cameras.main.followOffset.set(0, 0);
    
    this.crear_colliders();
  }
  
  // ================================================================
  update() {

    // this.pointer_showXY(this.mouse_showXY);

    this.crear_nuevaColisionBarril();
    crear_nuevoBarril(this);

    this.jugador.update();
    this.enemigo.update();

    this.array_barril.forEach(barril => barril.update());
  }

  // ================================================================
  crear_colliders() {

    this.physics.add.collider(this.grupoBarriles, this.plataforma.get());

    // --------------------------------------------------------------------
    this.physics.add.collider(this.jugador.get(), this.plataforma.get(), (jugador, plataforma) => {

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
      
    }, this);

    // --------------------------------------------------------------------
    this.physics.add.collider(this.enemigo.get(), this.plataforma.get(), (enemigo, plataforma) => {

      //console.log(plataforma.getData('index'), plataforma.getData('ultima'));

      if (plataforma.getData('index') !== plataforma.getData('ultima')) {

        enemigo.setVelocityX(enemigo.getData('vel-x') * plataforma.getData('id'));
        enemigo.setFlip(enemigo.body.velocity.x < 0 ? true : false);
      }
    }, null, this);
  }

  // ================================================================
  crear_nuevaColisionBarril() {

    if (this.crearNuevoBarril) {

      this.array_barril.forEach(barril => {

        // console.log(this.jugador.get().x, barril.get().x);
  
        this.physics.add.overlap(this.jugador.get(), barril.get(), (jugador, barril) => {

          revivir_jugador(jugador);
        
        }, (jugador, barril) => {

          if (jugador.getData('disableBody') || jugador.alpha < 1 || jugador.y > barril.y + Math.floor(barril.body.height / 2)) return false;
          return true;
        });
      });
    }
  }

  // ================================================================
  pointer_showXY({create, show_mouseXY}) {
    
    if (!show_mouseXY) return;
    
    const pointer = this.input.activePointer;
    // console.log(pointer.worldX, pointer.worldY);
    
    create.setText([
      `x: ${pointer.worldX}`,
      `y: ${pointer.worldY}`
    ]).setX(this.jugador.get().x).setY(this.jugador.get().y - 170);
  }
}
