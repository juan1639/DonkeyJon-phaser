
// =======================================================================
export class Decorativos {

    static tileXY = [64, 64];
    static SCALE = 1;

    static array_decorativos = [
        [100, 465, 2, 'letrero-kenney', 0.5],
        [1470, 430, 2, 'letrero-creditos', 0.5],
        [500, 485, 2, 'flecha-derecha', 1],
        [1269, 212, 2, 'flecha-izquierda', 1],
        [255, 195, 2, 'flecha-arriba', 1],
        [1275, 425, 1, 'flecha-arriba', 1],
        [50, 157, 1, 'letrero-arlekin', 0.5],
        [230, 500, 0, 'flecha-derecha', 1],
        [775, 487, 0, 'flecha-upde', 1],
        [1350, 440, 0, 'letrero-imi', 0.5],
        [1365, 238, 0, 'letrero-exit', 0.8],
    ];

    // -----------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        const ancho = this.relatedScene.sys.game.config.width;
        const alto = this.relatedScene.sys.game.config.height;

        this.decorativos = this.relatedScene.physics.add.group();

        Decorativos.array_decorativos.forEach(args => {

            this.decorativos.create(args[0], alto * args[2] + args[1], args[3]);
        });

        this.decorativos.children.iterate((decora, index) => {

            decora.body.setImmovable(true).setAllowGravity(false);
            decora.setScale(Decorativos.array_decorativos[index][4]);
        });

        console.log(this.decorativos);
    }

    get() {
        return this.decorativos;
    }
}
