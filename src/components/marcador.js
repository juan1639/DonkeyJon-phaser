import { Settings } from "../scenes/settings.js";

// ===========================================================================
export class Marcador {

    constructor(scene, datos) {
        this.relatedScene = scene;
        this.datos = datos;
    }

    create() {

        const { x, y, size, txt, color, id } = this.datos;

        let texto = '';

        if (id === 0) texto = `${txt}${Settings.getPuntos()}`;
        if (id === 1) texto = `${txt}${Settings.getNivel()}`;
        if (id === 2) texto = `${txt}${Settings.getRecord()}`;

        this.marcador = this.relatedScene.add.text(x, y, texto, {
            fontSize: size + 'px', fill: color, fontFamily: 'verdana, arial, sans-serif'
        });

        console.log(this.marcador);
    }

    get() {
        return this.marcador;
    }
}
