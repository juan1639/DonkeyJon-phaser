import { Plataforma } from "./plataforma.js";

// ===========================================================================
export class Marcador {

    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.size = 20;

        this.left = Math.floor(Plataforma.WIDTH / 2);
        this.top = Math.floor(Plataforma.HEIGHT / 2);
        
        this.marcador = this.relatedScene.add.text(0, 0, ' Puntos: 0', { fontSize: this.size + 'px', fill: '#fff', fontFamily: 'verdana, arial, sans-serif' });
        console.log(this.marcador);
    }

    update(x, y) {

        this.marcador.setX(x - this.left);
        this.marcador.setY(y - this.top);

        if (this.marcador.x < 0) this.marcador.setX(0);
        if (this.marcador.x > 360) this.marcador.setX(360);
        if (this.marcador.y < 0) this.marcador.setY(0);
        if (this.marcador.y > 328) this.marcador.setY(328);
    }

    get() {
        return this.marcador;
    }
}
