import { Settings } from "../scenes/settings.js";

// =======================================================================
export class Pajaro {

    static array_iniXY = [
        [400, 160, 0],
        [700, 600, -1],
        [1400, 1200, 1]
    ];

    // ------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.pajaro = this.relatedScene.physics.add.group();

        Pajaro.array_iniXY.forEach(valor => {

            this.pajaro.create(valor[0], valor[1], 'pajaro');
        });

        this.relatedScene.anims.create({
            key: 'bird-left-right', 
            frames: this.relatedScene.anims.generateFrameNumbers('pajaro', {start: 0, end: 19}),
            frameRate: 10,
            // yoyo: true,
            repeat: -1
        });
        
        this.pajaro.getChildren().forEach((bird, index) => {

            bird.setData('vel-x', this.establecer_dificultad());
            bird.setData('vel-y', 70 * Pajaro.array_iniXY[index][2]);
            bird.setCollideWorldBounds(true);
            bird.body.setAllowGravity(false);
            bird.setAngle(0).setFlip(true).setBounce(1);
            bird.setVelocityX(bird.getData('vel-x')).setVelocityY(bird.getData('vel-y'));
            bird.anims.play('bird-left-right');
        });

        console.log(this.pajaro);
    }

    update() {

        this.pajaro.children.iterate(bird => {

            if (bird.x <= bird.body.width) bird.setFlipX(true);
            if (bird.x >= this.relatedScene.sys.game.config.width * 2 - bird.body.width) bird.setFlipX(false);
        });
    }

    establecer_dificultad() {

        if (Settings.getNivel() < 7) return Settings.getDificultadProgresiva()[Settings.getNivel()][1] * 3;

        return 160 * 3;
    }

    get() {
        return this.pajaro;
    }
}
