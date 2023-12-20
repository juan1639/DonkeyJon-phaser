// =======================================================================
export class Escalera {

    static WIDTH = 800;
    static HEIGHT = 550;

    static tileXY = [64, 64];

    static SCALE = 1;

    static array_escaleras = [
        [Escalera.WIDTH + 280, Escalera.HEIGHT * 3 - 50, Escalera.tileXY[1], 0, 9, 9, 9, 9],
        [340, 1324, Escalera.tileXY[1], 0, 9, 9, 9, 9, 9],
        [Escalera.WIDTH + 300, 1008, Escalera.tileXY[1], 0, 9, 9, 9],
        [310, 774, Escalera.tileXY[1], 0, 9, 9, 9, 9],
        [Escalera.WIDTH + 100, 508, Escalera.tileXY[1], 0, 9, 9, 9, 9]
    ];

    // -----------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {
        
        this.escalera = [];

        Escalera.array_escaleras.forEach(plantilla=> {

            let coor = [];
            let tiles = [];

            for (let i = 0; i < plantilla.length; i ++) {

                if (i < 4) {
                    coor.push(plantilla[i]);
                } else {
                    tiles.push(plantilla[i].toString());
                }
            }

            this.escalera.push(this.relatedScene.physics.add.staticGroup({
                key: tiles,
                frame: 0,
                quantity: 1,
                setXY:
                {
                    x: coor[0],
                    y: coor[1],
                    stepX: coor[3],
                    stepY: -coor[2]
                }
            }));
        });

        for (let i = 0; i < this.escalera.length; i ++) {

            this.escalera[i].getChildren().forEach(tile => {
                // tile.setScale(0.5);
                tile.setOrigin(0, 1);
                tile.setData('index', i);
                // tile.setData('ultima', this.plataforma.length - 1);
            });
        }
        
        console.log(this.escalera);
        console.log(this.escalera[0].getChildren());
    }

    get() {
        return this.escalera;
    }
}
