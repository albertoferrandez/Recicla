export class Fin extends Phaser.Scene {
    constructor() {
        super({key: 'fin'});
    }

    preload() {
        this.load.image('fondo3', 'imatges/fondoLose.png');


    }

    create() {

        this.fondoLose = this.physics.add.image(600, 400, 'fondo3').setImmovable();
        this.fondoLose.body.allowGravity = false;

        const reinici = this.add.text(530, 630, 'Reiniciar Joc', {
            fill: '#fff',
            padding: {left: 23, right: 23, top: 12, bottom: 12},
            backgroundColor: '#4b8391',
            fontFamily: 'roboto, sans-serif'
        });
        reinici.setInteractive({cursor: 'pointer'});
        reinici.on('pointerdown', () => {
            this.scene.start('game');
        });
    }
}