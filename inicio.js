
export class Inicio extends Phaser.Scene {

    constructor() {
        super({key: 'inicio'});
    }

    preload() {

        this.load.image('fondo', 'imatges/fondo.png');

    }

    create() {
        this.titulo = this.physics.add.image(600, 400, 'fondo').setImmovable();
        this.titulo.body.allowGravity = false;

        const inicio = this.add.text(540, 630, 'Iniciar Joc', {
            fill: '#fff',
            padding: {left: 23, right: 23, top: 12, bottom: 12},
            backgroundColor: '#4b8391',
            fontFamily: 'roboto, sans-serif'
        });
        inicio.setInteractive({cursor: 'pointer'});
        inicio.on('pointerdown', () => {
            this.scene.start('game');
        });
        
    }

}

