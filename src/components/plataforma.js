// =======================================================================
export class Plataforma {

    static WIDTH = 800;
    static HEIGHT = 550;

    static tileXY = [64, 64];

    static SCALE = 0.5;

    // --------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const plantilla = [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3];
        let tiles = [];

        for (let i = 0; i < plantilla.length; i ++) {
            tiles.push(plantilla[i].toString());
        }

        this.plataforma = this.relatedScene.physics.add.group({
            key: tiles,
            frame: 0,
            quantity: 1,
            setXY:
            {
                x: 100,
                y: 400,
                stepX: 64,
                stepY: -1
            }
        });

        this.plataforma.getChildren().forEach(tile => {
            // tile.setScale(0.5);
            tile.body.setImmovable(true);
            tile.body.setAllowGravity(false);
        });

        // this.plataforma.setGravityY(false);

        // this.plataforma = this.relatedScene.physics.add.staticGroup();

        // this.plataforma.create(100, 1000, 'tile1').setScale(Plataforma.SCALE).refreshBody();
        // this.plataforma.create(200, 1000, 'tile1').setScale(Plataforma.SCALE).refreshBody();

        console.log(this.plataforma);
        console.log(this.plataforma.getChildren());
    }

    get() {
        return this.plataforma;
    }
}
