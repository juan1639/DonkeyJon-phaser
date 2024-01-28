
// =======================================================================
export class Enemigo {

    static XY_INI = [0, 0];

    // ------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.enemigo = this.relatedScene.physics.add.sprite(Enemigo.XY_INI[0], Enemigo.XY_INI[1], 'enemigo');

        this.enemigo.setData('vel-x', 120);//40
        this.enemigo.setCollideWorldBounds(true);
        this.enemigo.setAngle(0).setFlip(false).setBounce(1, 0.3).setVelocityX(this.enemigo.getData('vel-x'));


        this.relatedScene.anims.create({
            key: 'enemy-left-right', 
            frames: this.relatedScene.anims.generateFrameNumbers('enemigo', {start: 9, end: 10}),
            frameRate: 10,
            yoyo: true,
            repeat: -1
        });

        this.relatedScene.anims.create({
            key: 'enemy-turn',
            frames: [{key: 'enemigo', frame: 0}],
            frameRate: 20
        });
        
        this.relatedScene.anims.create({
            key: 'enemy-kick', 
            frames: [{key: 'enemigo', frame: 15}],
            frameRate: 10,
            msPerFrame: 2000
        });

        this.enemigo.anims.play('enemy-left-right', true);

        console.log(this.enemigo);
    }

    update() {

        if (this.enemigo.x <= this.enemigo.body.width * this.enemigo.originX) this.enemigo.setFlip(false);

    }

    get() {
        return this.enemigo;
    }
}

