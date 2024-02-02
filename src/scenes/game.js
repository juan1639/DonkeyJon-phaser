// =========================================================================================
//  D O N K E Y - J O N  4
// 
// -----------------------------------------------------------------------------------------
import { loader } from './loader.js';
import { Settings } from './settings.js';
import { Decorativos } from '../components/decorativos.js';
import { Switchs } from '../components/switchs.js';
import { Plataforma } from '../components/plataforma.js';
import { Escalera } from '../components/escalera.js';
import { Jugador, JugadorShowVidas } from '../components/jugador.js';
import { Enemigo } from '../components/enemigo.js';
import { Pajaro } from '../components/pajaro.js';
import { Barril } from '../components/barril.js';
import { Marcador } from '../components/marcador.js';
import { Textos } from '../components/textos.js';
import { BotonSalto, CrucetaDireccion } from '../components/botonycruceta.js';
import { BotonFullScreen } from '../components/boton-nuevapartida.js';

import {
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
  getSettings_json,
  play_sonidos
} from '../functions/functions.js';

// --------------------------------------------------------------
export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }

  init() {

    Settings.setNivelSuperado(false);
    this.array_barril = [];
    this.crearNuevoBarril = false;
    this.barrilIndex = 0;

    this.decorativos = new Decorativos(this);
    this.switch = new Switchs(this);
    this.plataforma = new Plataforma(this);
    this.escalera = new Escalera(this);
    this.jugador = new Jugador(this);
    this.enemigo = new Enemigo(this);
    this.array_barril.push(new Barril(this));
    this.pajaro = new Pajaro(this);

    const ancho = this.sys.game.config.width;
    const alto = this.sys.game.config.height;

    this.jugadorSV = new JugadorShowVidas(this, {
      xx: Math.floor(ancho / 1.3), yy: -85, scX: 25, scY: 28
    });

    this.txt1 = new Textos(this);

    this.txtObj = {
      txtSwitch: new Textos(this),
      bool: false,
      duracion: 4000
    };

    this.marcadorPtos = new Marcador(this, {
      x: 10, y: -99, size: 35, txt: ' Puntos: ', color: '#fff', id: 0
    });

    this.marcadorNivel = new Marcador(this, {
      x: Math.floor(ancho / 2), y: -99, size: 35, txt: ' Nivel: ', color: '#ff5', id: 1
    });

    this.marcadorHi = new Marcador(this, {
      x: Math.floor(ancho / 1.1), y: -99, size: 35, txt: ' Record: ', color: '#fff', id: 2
    });

    this.botonfullscreen = new BotonFullScreen(this, {
      id: 'boton-fullscreen', x: Math.floor(this.sys.game.config.width * 1.35), y: -77,
      ang: 0, scX: 0.6, scY: 0.6 
    });

    var { xx, yy, sizeX, sizeY } = Settings.getCoorCruceta();
    
    this.crucetaleft = new CrucetaDireccion(this, {
      id: 'cruceta-left',
      x: xx, y: yy,
      ang: 0,
      scX: sizeX, scY: sizeY
    });
    
    this.crucetaright = new CrucetaDireccion(this, {
      id: 'cruceta-right',
      x: xx + 340, y: yy,
      ang: 0,
      scX: sizeX, scY: sizeY
    });
    
    this.crucetaup = new CrucetaDireccion(this, {
      id: 'cruceta-left',
      x: xx + 175, y: yy - 80,
      ang: 90,
      scX: sizeX - 0.9, scY: sizeY + 0.1
    });
    
    this.crucetadown = new CrucetaDireccion(this, {
      id: 'cruceta-left',
      x: xx + 175, y: yy + 110,
      ang: 270,
      scX: sizeX + 1, scY: sizeY
    });
    
    var { xx, yy, sizeX, sizeY } = Settings.getCoorBotonSalto();

    this.botonsalto = new BotonSalto(this, {
      id: 'boton-salto',
      x: xx, y: yy,
      ang: 0,
      scX: sizeX, scY: sizeY
    });
  }

  preload() {
    
    loader(this);
  }

  create() {
    //getSettings_json(this);

    this.sonidos_set();

    // --------------------------------------------------------------------
    const yBounds = 3;
    imagenes_fondo(this.sys.game.config.width, this.sys.game.config.height, yBounds, this);

    this.grupoBarriles = [];
    imagen_grupoBarriles(this);

    // ---------------------------------------------------------------------
    this.cameraMain_set(yBounds);
    this.cameras_set();

    // ---------------------------------------------------------------------
    this.decorativos.create();
    this.switch.create();
    this.plataforma.create();
    this.escalera.create();
    this.jugador.create();
    this.enemigo.create();
    this.array_barril[this.barrilIndex].create(this.barrilIndex, this.plataforma, this.enemigo);
    this.pajaro.create();

    // ---------------------------------------------------------------------
    this.marcadorPtos.create();
    this.marcadorNivel.create();
    this.marcadorHi.create();
    this.jugadorSV.create();
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
    this.pajaro.update();

    this.array_barril.forEach(barril => barril.update());
  }

  // ================================================================
  cameras_set() {

    var { x, y, ancho, alto, scrollX, scrollY } = Settings.getCameraEnemigo();
    
    this.mapa_viewEnemigo = this.cameras.add(x, y, ancho, alto).setZoom(0.3).setName('view-enemigo');
    this.mapa_viewEnemigo.scrollX = scrollX;
    this.mapa_viewEnemigo.scrollY = scrollY;
    // console.log(this.mapa_viewEnemigo);

    var { x, y, ancho, alto, scrollX, scrollY } = Settings.getCameraScores();
    
    this.mapa_scores = this.cameras.add(x, y, ancho, alto).setZoom(0.6).setName('view-scores').setAlpha(0.7).setOrigin(0, 0);
    this.mapa_scores.scrollX = scrollX;
    this.mapa_scores.scrollY =scrollY;
    // console.log(this.mapa_scores);
    
    var { x, y, ancho, alto, scrollX, scrollY } = Settings.getCameraControles();

    this.mapa_controles = this.cameras.add(x, y, ancho, alto).setZoom(0.9).setName('view-controls').setAlpha(0.7).setOrigin(0, 0);
    this.mapa_controles.scrollX = scrollX;
    this.mapa_controles.scrollY = scrollY;
    // console.log(this.mapa_controles);
  }

  // ----------------------------------------------------------------
  cameraMain_set(yBounds) {

    // --- El +50 es para que se vean mejor los botones mobile al comienzo del juego
    this.cameras.main.setBounds(
      0, 0,
      Math.floor(this.sys.game.config.width * 2), Math.floor(this.sys.game.config.height * yBounds)
    );

    this.physics.world.setBounds(
      0, 0,
      Math.floor(this.sys.game.config.width * 2), Math.floor(this.sys.game.config.height * yBounds)
    );
    console.log(this.physics.world);
  }

  // ================================================================
  sonidos_set() {

    this.sonidoMusicaFondo = this.sound.add('musica-fondo');
    if (!this.sonidoMusicaFondo.isPlaying) play_sonidos(this.sonidoMusicaFondo, true, 0.7);

    this.sonidoSalto = this.sound.add('salto');
    this.sonidoOugh = this.sound.add('ough');
    this.sonidoUmph = this.sound.add('umph');
    this.sonidoSwitch = this.sound.add('pacmanazules');
    this.sonidoLevelUp = this.sound.add('level-up');
    this.sonidoGritoCaer = this.sound.add('grito-caer');
  }

  // ================================================================
  crear_colliders() {

    this.physics.add.collider(this.grupoBarriles, this.plataforma.get());
    collider_jugador_plataforma(this);
    collider_enemigo_plataforma(this);
    overlap_jugador_switch(this);
    overlap_jugador_enemigo(this);
    overlap_jugador_pajaro(this);
  }

  // ================================================================
  crear_nuevaColisionBarril() {

    if (this.crearNuevoBarril) {

      this.array_barril.forEach(barril => {

        // console.log(this.jugador.get().x, barril.get().x);
  
        this.physics.add.overlap(this.jugador.get(), barril.get(), (jugador, barril) => {

          setTimeout(() => play_sonidos(this.sonidoUmph, false, 1.0), 700);
          play_sonidos(this.sonidoOugh, false, 1.0);

          const left = this.jugador.get().x - 110;
          const top = this.jugador.get().y + 120;
          const screenW = this.sys.game.config.width;

          this.txt1.create({
            x: left, y: top, texto: ' Ouch! ', size: 70, style: 'bold',
            oofx: 1, offy: 1, col: '#ffa', blr: 15, fillShadow: true, fll: '#f31',
            family: 'verdana, arial, sans-serif', screenWidth: screenW, multip: 2
          });

          setTimeout(() => this.txt1.get().destroy(), this.txtObj.duracion);

          revivir_jugador(jugador, this);
                
        }, (jugador, barril) => {

          if (
            jugador.getData('disableBody') ||
            jugador.alpha < 1 ||
            Settings.isNivelSuperado() ||
            Settings.getVidas() < 0 ||
            jugador.y > barril.y + Math.floor(barril.body.height / 2)
          ) return false;

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
