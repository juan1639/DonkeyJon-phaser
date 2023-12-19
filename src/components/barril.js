// =======================================================================
export class Barril {

    static SCALE = 1;

    // --------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.barril = this.relatedScene.physics.add.sprite(650, 100, 'barril2');

        this.barril.setCollideWorldBounds(true);
        this.barril.setBounceY(0.5);
        this.barril.setAngle(120);
        this.barril.setData('rotacion', -1);
        this.barril.setData('acel', 130);
        
        console.log(this.barril);
        console.log(this.barril.getData('rotacion'));
    }
    
    update() {
        this.barril.rotation += 0.1 * this.barril.getData('rotacion');
    }

    get() {
        return this.barril;
    }
}
