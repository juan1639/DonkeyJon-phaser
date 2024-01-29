
// ====================================================================================
export class Settings {

    static puntos = 0;
    static nivel = 1;
    static hi = 20000;
    static vidas = 3;
    static nivelSuperado = false;

    static botonesYcruceta = true;

    static cheatInvisible = 1; // 1 normal, !== 1 cheat

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
        y: 375,
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

    static isNivelSuperado() {
        return Settings.nivelSuperado;
    }

    static isBotonesYcruceta() {
        return Settings.botonesYcruceta;
    }

    static getCheatInvisible() {
        return Settings.cheatInvisible;
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

    static setCheatInvisible(ceroauno) {
        Settings.cheatInvisible = ceroauno;
    }

    static setCoorCruceta(coorCruceta) {
        Settings.coorCruceta = coorCruceta;
    }

    static setCoorBotonSalto(coorBotonSalto) {
        Settings.coorBotonSalto = coorBotonSalto;
    }
}
