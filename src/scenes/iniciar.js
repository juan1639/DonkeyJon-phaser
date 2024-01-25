import { centrar_txt } from "../functions/functions.js";

// =================================================================================
export class Iniciar extends Phaser.Scene {

    static WIDTH = 800;
    static HEIGHT = 550;

    // ------------------------------------------------
    constructor() {
        super({ key: 'iniciar' });
    }

    create() {

        // this.add.image(0, 0, 'fondoAzulRojizo').setOrigin(0, 0);
        this.size = 50;
        this.left = Math.floor(Iniciar.WIDTH / 6.2);
        this.top = Math.floor(Iniciar.HEIGHT / 3);
        
        const txt1 = this.add.text(this.left, this.top, ' Toque pantalla o haga ', {
            fontSize: this.size + 'px',
            fontStyle: '500',
            align: 'left',
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#fff',
                blur: 7,
                fill: true
            },
            fill: '#ffa',
            fontFamily: 'verdana, arial, sans-serif'
        });

        txt1.setX(centrar_txt(txt1, this.sys.game.config.width));

        const txt2 = this.add.text(this.left, this.top + 100, ' click para comenzar... ', {
            fontSize: this.size + 'px',
            fontStyle: '500',
            align: 'left',
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: '#fff',
                blur: 7,
                fill: true
            },
            fill: '#ffa',
            fontFamily: 'verdana, arial, sans-serif'
        });

        txt2.setX(centrar_txt(txt1, this.sys.game.config.width));

        this.input.on('pointerdown', () => this.scene.start('menuprincipal'));

        console.log(this);
    }
}
