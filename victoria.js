
export class Victoria extends Phaser.Scene {
    constructor() {
        super({key: 'victoria'});
    }

    preload() {
        
        this.cameras.main.setBackgroundColor(0x80ED99);

        this.load.image('fondo2', 'imatges/fondoWin.png');

    }

    create() {
        this.titulo = this.physics.add.image(600, 400, 'fondo2').setImmovable();
        this.titulo.body.allowGravity = false;
        
         const tornar = this.add.text(530, 630, 'Tornar a Jugar', {
            fill: '#fff',
            padding: {left: 23, right: 23, top: 12, bottom: 12},
            backgroundColor: '#4b8391',
            fontFamily: 'roboto, sans-serif'
        });
        tornar.setInteractive({cursor: 'pointer'});
        tornar.on('pointerdown', () => {
            this.scene.start('game');
        });
    }

}