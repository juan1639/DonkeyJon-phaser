import { Settings } from "../scenes/settings.js";

// ==================================================================================
export class CrucetaDireccion {

    static WIDTH = 800;
    static HEIGHT = 550;

    // --------------------------------------------------------
    constructor(scene, direccion) {
        this.relatedScene = scene;
        this.direccion = direccion;
    }

    create() {

        if (!Settings.isBotonesYcruceta()) return;

        this.boton = this.relatedScene.add.image(this.direccion.x, this.direccion.y, this.direccion.id).setInteractive();
        this.boton.setScale(this.direccion.scX, this.direccion.scY).setAngle(this.direccion.ang).setDepth(4);
        this.boton.setX(this.direccion.x).setY(this.direccion.y);
        this.boton.setData('on', true);

        this.isDown = false;
    
        this.boton.on('pointerover', () => {
          this.boton.setScale(this.direccion.scX + 0.1, this.direccion.scY + 0.1);
        });

        this.boton.on('pointerout', () => {
          this.boton.setScale(this.direccion.scX, this.direccion.scY);
        });

        this.boton.on('pointerdown', () => {
            this.isDown = true;
            
        });

        this.boton.on('pointerup', () => {
            this.isDown = false;
        });

        console.log(this.boton);
    }

    update(x, y) {

        const limit_le = Math.floor(this.relatedScene.sys.game.config.width / 2);// 400
        const limit_ri = Math.floor(this.relatedScene.sys.game.config.width * 1.5);// 750
        const limit_up = Math.floor(this.relatedScene.sys.game.config.height / 2);// 260
        const limit_do = Math.floor(this.relatedScene.sys.game.config.height * 2.5);// 600

        if (x > limit_le && x < limit_ri) this.boton.setX(x - this.direccion.x);
        if (y > limit_up && y < limit_do) this.boton.setY(y + this.direccion.y);
    }

    get() {
        return this.boton;
    }
}

// ==================================================================================
export class BotonSalto {

    // --------------------------------------------------------
    constructor(scene, direccion) {
        this.relatedScene = scene;
        this.direccion = direccion;
    }

    create() {

        if (!Settings.isBotonesYcruceta()) return;

        this.boton = this.relatedScene.add.image(this.direccion.x, this.direccion.y, this.direccion.id).setInteractive();
        this.boton.setScale(this.direccion.scX, this.direccion.scY).setAngle(this.direccion.ang).setDepth(4);
        this.boton.setX(this.direccion.x).setY(this.direccion.y);
        this.boton.setData('on', true);
        
        this.isDown = false;
    
        this.boton.on('pointerover', () => {
          this.boton.setScale(this.direccion.scX + 0.1, this.direccion.scY + 0.1);
        });

        this.boton.on('pointerout', () => {
          this.boton.setScale(this.direccion.scX, this.direccion.scY);
        });

        this.boton.on('pointerdown', () => {
            this.isDown = true;
            
        });

        this.boton.on('pointerup', () => {
            this.isDown = false;
        });
    }

    get() {
        return this.boton;
    }
}
