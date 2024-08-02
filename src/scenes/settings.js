
// ====================================================================================
export class Settings {

    static screen = {
        width: 800,
        height: 550
    };

    static puntos = 0;
    static nivel = 1;
    static hi = 5000;
    static vidas = 3;
    static nivelSuperado = false;

    static dificultadProgresiva = [
        [2000, 60],
        [1500, 90],
        [1000, 120],
        [800, 140],
        [600, 160],
        [500, 170],
        [400, 160]
    ];

    static botonesYcruceta = true;

    static invisible = {
        cheatInvisible: 1,
        duracionInvisible: 8300,
        duracionDie: 4800
    };

    static coorCruceta = {
        xx: 60,
        yy: 2500,
        sizeX: 1,
        sizeY: 1
    };

    static coorBotonSalto = {
        xx: 780,
        yy: 2460,
        sizeX: 0.6,
        sizeY: 1.4
    };

    static cameraEnemigo = {
        x: 0,
        y: 0,
        ancho: 120,
        alto: 50,
        scrollX: 150,
        scrollY: 280
    };

    static cameraScores = {
        x: 120,
        y: 0,
        ancho: 680,
        alto: 25,
        scrollX: 0,
        scrollY: -99
    };

    static cameraControles = {
        x: 0,
        y: 375,
        ancho: 800,
        alto: 220,
        scrollX: 0,
        scrollY: 2350
    };

    // -----------------------------------------------
    static getScreen() {
        return Settings.screen;
    }

    static getPuntos() {
        return Settings.puntos;
    }

    static getNivel() {
        return Settings.nivel;
    }

    static getRecord() {
        return Settings.hi;
    }

    static getVidas() {
        return Settings.vidas;
    }

    static isNivelSuperado() {
        return Settings.nivelSuperado;
    }

    static getDificultadProgresiva() {
        return Settings.dificultadProgresiva;
    }

    static isBotonesYcruceta() {
        return Settings.botonesYcruceta;
    }

    static getInvisible() {
        return Settings.invisible;
    }

    static getCoorCruceta() {
        return Settings.coorCruceta;
    }

    static getCoorBotonSalto() {
        return Settings.coorBotonSalto;
    }

    static getCameraEnemigo() {
        return Settings.cameraEnemigo;
    }

    static getCameraScores() {
        return Settings.cameraScores;
    }

    static getCameraControles() {
        return Settings.cameraControles;
    }

    // -----------------------------------------------
    static setPuntos(ptos) {
        Settings.puntos = ptos;
    }

    static setNivel(level) {
        Settings.nivel = level;
    }

    static setRecord(hiScore) {
        Settings.hi = hiScore;
    }

    static setVidas(lifes) {
        Settings.vidas = lifes;
    }

    static setNivelSuperado(superado) {
        Settings.nivelSuperado = superado;
    }

    static setBotonesYcruceta(bool) {
        Settings.botonesYcruceta = bool;
    }

    static setInvisible(dataObj) {
        Settings.invisible = dataObj;
    }

    static setCoorCruceta(coorCruceta) {
        Settings.coorCruceta = coorCruceta;
    }

    static setCoorBotonSalto(coorBotonSalto) {
        Settings.coorBotonSalto = coorBotonSalto;
    }
}
