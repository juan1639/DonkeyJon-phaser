
// ====================================================================================
export class Settings {

    static puntos = 0;
    static nivel = 1;
    static hi = 20000;
    static vidas = 3;
    static botonesYcruceta = true;

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
}
