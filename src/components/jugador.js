import { Plataforma } from "./plataforma.js";

// =======================================================================
export class Jugador {

    static XY_INI = [Plataforma.WIDTH / 9, Plataforma.HEIGHT / 2];
    static VEL = 4;

    // ------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.jugador = this.relatedScene.physics.add.sprite(Jugador.XY_INI[0], Jugador.XY_INI[1], 'jugador');
        this.jugador.angle = 0;

        // this.jugador.setCollideWorldBounds(true);
        // this.jugador.setBounce(0.2);

        this.relatedScene.anims.create({
            key: 'left', 
            frames: this.relatedScene.anims.generateFrameNumbers('jugador', {start: 1, end: 3}),
            frameRate: 30,
            yoyo: true,
            repeat: -1
        });

        this.relatedScene.anims.create({
            key: 'right', 
            frames: this.relatedScene.anims.generateFrameNumbers('jugador', {start: 4, end: 6}),
            frameRate: 30,
            yoyo: true,
            repeat: -1
        });

        this.relatedScene.anims.create({
            key: 'turn',
            frames: [{key: 'jugador', frame: 0}],
            frameRate: 20,
        });

        this.controles = this.relatedScene.input.keyboard.createCursorKeys();

        console.log(this.jugador);
    }

    update() {
    }

    get() {
        return this.jugador;
    }
}

