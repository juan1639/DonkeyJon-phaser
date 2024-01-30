import { Textos } from "../components/textos.js";

// =================================================================================
export class Iniciar extends Phaser.Scene {

    static WIDTH = 800;
    static HEIGHT = 550;

    // ------------------------------------------------
    constructor() {
        super({ key: 'iniciar' });
    }

    init() {
        this.txt = new Textos(this);
    }

    create() {

        const left = Math.floor(Iniciar.WIDTH / 6.2);
        const top = Math.floor(Iniciar.HEIGHT / 3);

        this.txt.create({
            x: left, y: top, texto: ' Toque pantalla o haga \n \n click para comenzar... ',
            size: 50, style: '500', oofx: 1, offy: 1, col: '#fff', blr: 7,
            fillShadow: true, fll: '#ffa', family: 'verdana, arial, sans-serif',
            screenWidth: Iniciar.WIDTH, multip: 1
        });
        
        this.input.on('pointerdown', () => this.scene.start('menuprincipal'));

        console.log(this.txt);
    }
}
