import { centrar_txt } from "../functions/functions.js";

// =======================================================================
export class Textos {

    // -----------------------------------------------------------
    constructor(scene) {
        this.relatedScene = scene;
    }

    create(args) {

        const {
            x, y, texto, size, style, offx, offy, col, blr, fillShadow, fll, family, screenWidth, multip
        } = args;

        console.log(args);

        this.txt = this.relatedScene.add.text(x, y, texto, {
            fontSize: size + 'px',
            fontStyle: style,
            shadow: {
                offsetX: offx,
                offsetY: offy,
                color: col,
                blur: blr,
                fill: fillShadow
            },
            fill: fll,
            fontFamily: family
        });

        this.centrar(texto, screenWidth, multip);
        this.crear_tweens(texto);

        console.log(this.txt);
    }

    crear_tweens(texto) {

        const array_tweens = [
            ' Ouch! ',
            ' Fuera de aqui! \n cacho subnormal! '
        ];

        array_tweens.forEach(tween => {

            if (tween.slice(0, 5) === texto.slice(0, 5)) {

                this.relatedScene.tweens.add({
                    targets: this.txt,
                    y: this.relatedScene.sys.game.config.height * 3 - 200,
                    x: this.relatedScene.jugador.get().x,
                    scale: 1.2,
                    ease: 'easeOut',
                    duration: 1500
                });
            }
        });

        // ----------------------------------------------
        const array_tweens2 = [
            ' DonkeyJon ',
            ' Nivel Superado! '
        ];

        array_tweens2.forEach(tween => {

            if (tween === texto) {

                this.relatedScene.tweens.add({
                    targets: this.txt,
                    scale: 1.2,
                    x: 24,
                    ease: 'Ease',
                    yoyo: true,
                    hold: 900,
                    duration: 2000,
                    repeat: -1
                });
            }
        });
    }

    centrar(texto, screenWidth, multip) {

        const centrarTxt = [
            ' DonkeyJon ',
            ' Nivel ',
            ' Nivel Superado! '
        ];

        centrarTxt.forEach(centra => {
            if (texto.slice(0, 5) === centra.slice(0, 5)) this.txt.setX(centrar_txt(this.txt, screenWidth * multip));
        });
    }

    get() {
        return this.txt;
    }
}
