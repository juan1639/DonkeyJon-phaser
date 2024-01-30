import { nivel_superado } from "../functions/functions.js";

// =============================================================================
export class Switchs {

    static tileXY = [64, 64];
    static SCALE = 1;

    static array_switchs = [
        [1575, 250, 0, 'switch2', 1],//1575, 250
        [1400, 0, 0, 'switch1', 1],
        [1300, 0, 0, 'switch0', 1],
        [276, 497, 0, 'switch2', 1],//276, 497
        [300, 0, 0, 'switch1', 1],
        [200, 0, 0, 'switch0', 1]
    ];
    
    // ------------------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.array_changes = [
            ['switch2', 'switch0', 2],
            ['switch0', 'switch2', 0],
        ];

        this.pausa = {
            tiempo: 200,
            pausa: false
        };

        const ancho = this.relatedScene.sys.game.config.width;
        const alto = this.relatedScene.sys.game.config.height;

        this.switch = this.relatedScene.physics.add.group();

        Switchs.array_switchs.forEach(args => {

            this.switch.create(args[0], alto * args[2] + args[1], args[3]);
        });

        const arrS = Switchs.array_switchs;

        this.switch.children.iterate((sw, index) => {

            sw.body.setImmovable(true).setAllowGravity(false)
            sw.setScale(arrS[index][4]).disableBody(true, true);
            sw.setData('key', arrS[index][3]);

            if (arrS[index][3] === 'switch2' && index < 3) sw.enableBody(true, sw.x, sw.y, true, true);
        });

        console.log(this.switch);
    }

    update() {

    }

    changeItem(id, x, y) {

        console.log('id', id);

        this.array_changes.forEach(cambiar => {

            const actual = cambiar[0];
            const nuevo = cambiar[2];

            if (id === actual) this.switch.getChildren()[nuevo].enableBody(true, x, y, true, true);

            this.acciones_switchs(x, y);
        });
    }

    pausaChange() {

        if (this.pausa.pausa) return;

        this.pausa.pausa = true;
        setTimeout(() => this.pausa.pausa = false, this.pausa.tiempo);
    }

    acciones_switchs(x, y) {

        if (x === Switchs.array_switchs[0][0] && y === Switchs.array_switchs[0][1]) {

            this.switch.getChildren()[3].enableBody(
                true, this.switch.getChildren()[3].x, this.switch.getChildren()[3].y, true, true
            );
        }

        if (x === Switchs.array_switchs[3][0] && y === Switchs.array_switchs[3][1]) {

            setTimeout(() => {

                // console.log(this.relatedScene.plataforma.get());
                this.relatedScene.enemigo.get().anims.play('enemy-fall');
                nivel_superado(this.relatedScene);

                const nro_plataformas = this.relatedScene.plataforma.get().length;

                this.relatedScene.plataforma.get().forEach((plataf, index) => {

                    plataf.children.iterate(tile => {
                        if (index === nro_plataformas - 1) tile.body.setImmovable(false);
                    });
                });
            }, 1200);
        }
    }

    get() {
        return this.switch;
    }
}
