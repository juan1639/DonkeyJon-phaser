// =======================================================================
export class Plataforma {

    static WIDTH = 800;
    static HEIGHT = 550;

    static tileXY = [64, 64];

    static SCALE = 0.5;

    static array_plataformas = [
        [0, Plataforma.HEIGHT * 3 - 5, Plataforma.tileXY[0], -1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [0, Plataforma.HEIGHT * 3 - 300, Plataforma.tileXY[0], 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [200, Plataforma.HEIGHT * 3 - 600, Plataforma.tileXY[0], -1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [0, Plataforma.HEIGHT * 2 - 300, Plataforma.tileXY[0], 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [200, Plataforma.HEIGHT, Plataforma.tileXY[0], -1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3],
        [0, Plataforma.HEIGHT - 200, Plataforma.tileXY[0], 1, 1, 2, 2, 2, 3],
        // [900, 300, 64, -1, 1, 2, 2, 2, 2, 2, 2, 2, 3]
    ];

    // -----------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
        
        this.plataforma = [];

        Plataforma.array_plataformas.forEach(plantilla=> {

            let coor = [];
            let tiles = [];

            for (let i = 0; i < plantilla.length; i ++) {

                if (i < 4) coor.push(plantilla[i]);

                if (i >= 4) tiles.push(plantilla[i].toString());
            }

            this.plataforma.push(this.relatedScene.physics.add.group({
                key: tiles,
                frame: 0,
                quantity: 1,
                setXY:
                {
                    x: coor[0],
                    y: coor[1],
                    stepX: coor[2],
                    stepY: coor[3]
                }
            }));
        });

        for (let i = 0; i < this.plataforma.length; i ++) {

            this.plataforma[i].getChildren().forEach(tile => {
                // tile.setScale(0.5);
                tile.body.setImmovable(true);
                tile.body.setAllowGravity(false);
                tile.setData('id', Plataforma.array_plataformas[i][3]);
            });
        }
        
        console.log(this.plataforma);
        console.log(this.plataforma[0].getChildren());
    }

    get() {
        return this.plataforma;
    }
}
