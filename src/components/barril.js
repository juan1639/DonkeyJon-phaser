
// =======================================================================
export class Barril {

    static INI_X = 200;
    static INI_Y = 200;

    static SCALE = 1;

    // --------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create(index, plataforma, enemigo) {

        this.barril = this.relatedScene.physics.add.sprite(Barril.INI_X, Barril.INI_Y, 'barril2');

        this.barril.setData('activo', false);
        this.barril.setData('rotacion', -1);
        this.barril.setData('acel', 130);
        this.barril.setData('id', index);

        this.barril.setCollideWorldBounds(true).setBounceY(0.5).setAngle(120).setActive(false);

        this.relatedScene.physics.add.collider(this.barril, plataforma.get(), (barril, plataforma) => {

            if (barril.getData('activo')) {
                barril.setAcceleration(barril.getData('acel') * plataforma.getData('id'));
                barril.setData('rotacion', plataforma.getData('id'));
            }
        }, null, this.relatedScene);

        this.relatedScene.physics.add.collider(enemigo.get(), this.barril, (enemigo, barril) => {

            barril.setData('activo', true);
            enemigo.anims.play('enemy-kick', true);
      
            setTimeout(() => {
              enemigo.setFlip(true);
              enemigo.setVelocityX(-enemigo.getData('vel-x'));
              enemigo.anims.play('enemy-left', true);
              this.relatedScene.crearNuevoBarril = true;
            }, 1000);//3000
        }, null, this);
        
        console.log(this.barril);
        console.log(this.barril.getData('rotacion'));
    }
    
    update() {
        if (this.barril.getData('activo')) this.barril.rotation += 0.1 * this.barril.getData('rotacion');
        console.log(this.barril.x);
    }

    get() {
        return this.barril;
    }
}
