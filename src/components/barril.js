// =======================================================================
export class Barril {

    static INI_X = 200;
    static INI_Y = 200;

    static SCALE = 1;

    // --------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create() {

        this.barril = this.relatedScene.physics.add.sprite(Barril.INI_X, Barril.INI_Y, 'barril2');

        this.barril.setData('activo', false);
        this.barril.setData('rotacion', -1);
        this.barril.setData('acel', 130);
        this.barril.setCollideWorldBounds(true);
        this.barril.setBounceY(0.5);
        this.barril.setAngle(120);
        this.barril.setActive(false);
        
        console.log(this.barril);
        console.log(this.barril.getData('rotacion'));
    }
    
    update() {
        if (this.barril.getData('activo')) this.barril.rotation += 0.1 * this.barril.getData('rotacion');
    }

    get() {
        return this.barril;
    }
}
