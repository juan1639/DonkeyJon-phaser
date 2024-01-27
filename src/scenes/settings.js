
// ====================================================================================
export class Settings {

    static puntos = 0;
    static nivel = 1;
    static hi = 20000;
    static vidas = 3;

    static botonesYcruceta = true;

    static coorCruceta = {
        xx: 60,
        yy: 2500,
        sizeX: 2.5,
        sizeY: 2.1
    };

    static coorBotonSalto = {
        xx: 780,
        yy: 2460,
        sizeX: 2.5,
        sizeY: 2.1
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
        y: 400,
        ancho: 800,
        alto: 220,
        scrollX: 0,
        scrollY: 2350
    };

    // -----------------------------------------------
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

    static isBotonesYcruceta() {
        return Settings.botonesYcruceta;
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

    static setBotonesYcruceta(bool) {
        Settings.botonesYcruceta = bool;
    }

    static setCoorCruceta(coorCruceta) {
        Settings.coorCruceta = coorCruceta;
    }

    static setCoorBotonSalto(coorBotonSalto) {
        Settings.coorBotonSalto = coorBotonSalto;
    }
}
