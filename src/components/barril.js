// =======================================================================
export class Barril {

    static SCALE = 0.5;

    // --------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.barril = this.relatedScene.physics.add.sprite(650, 100, 'barril');
        console.log(this.barril);
    }

    update() {
    }

    get() {
        return this.barril;
    }
}
