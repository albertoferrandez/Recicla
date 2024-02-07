
export class Game extends Phaser.Scene {
    waste = [
        'abrir-caja', 'anteojos', 'biberon', 'bolsa', 'carta',
        'cascara-de-huevo', 'hedor', 'botella-rota', 'cigarrillo',
        'comida-enlatada', 'espina-de-pescado', 'lata-de-refresco',
        'leche', 'papel', 'periodico', 'vidrio-roto', 'yogur', 'tv-vintage', 
        'las-pilas', 'sofa', 'bateria-de-coche'
    ]

    wasteToContainerMapping = {
        "abrir-caja": "blau",
        "anteojos": "verds",
        "biberon": "gris",
        "bolsa": "groc",
        "cigarrillo": "gris",
        "cascara-de-huevo": "verds",
        "hedor": "gris",
        "botella-rota": "verds",
        "lata-de-refresco": "groc",
        "comida-enlatada": "gris",
        "leche": "groc",
        "papel": "blau",
        "periodico": "blau",
        "vidrio-roto": "verds",
        "yogur": "gris",
        "tv-vintage": "ecoparc",
        "las-pilas": "ecoparc",
        "sofa": "ecoparc",
        "bateria-de-coche": "ecoparc"
    };

    containers = {
        blau: { images: ['guiñoblau', 'riureblau', 'serioblau'], position: { x: 100, y: 600 } },
        gris: { images: ['guiñogris', 'riuregris', 'seriogris'], position: { x: 350, y: 600 } },
        groc: { images: ['guiñogroc', 'riuregroc', 'seriogroc'], position: { x: 600, y: 600 } },
        verds: { images: ['guinoverd', 'riureverd', 'serioverd'], position: { x: 850, y: 600 } },
        ecoparc: { images: ['guinoecopark', 'riureecoparc', 'serioecoparc'], position: { x: 1100, y: 600 } }
    }

    constructor() {
        super({ key: 'game' });
    }

    init() {
        this.score = 0;
        this.lives = 5;
    }

    preload() {
        this.load.image('background', 'imatges/fondo.jpg');

        for (let residuo of this.waste) {
            this.load.image(residuo, 'imatges/' + residuo + '.png');
        }

        for (let color in this.containers) {
            for (let i = 0; i < this.containers[color].images.length; i++) {
                const imageName = this.containers[color].images[i];
                const imagePath = `imatges/${color}/${imageName}.png`;
                this.load.image(imageName, imagePath);
            }
        }
    }

    create() {
        this.add.image(600, 400, 'background');

        this.scoreText = this.add.text(16, 16, 'PUNTS : 0', {
            fontSize: '20px',
            fill: '#619B8A',
            fontFamily: 'roboto, sans-serif'
        });

        this.livesText = this.add.text(16, 64, 'ERRORS : 5', {
            fontSize: '20px',
            fill: '#619B8A',
            fontFamily: 'roboto, sans-serif'
        });

        this.physics.world.setBoundsCollision(false, true, true, false);

        for (let containerKey in this.containers) {
            const container = this.containers[containerKey];
            const position = container.position;
            this[containerKey] = this.physics.add.image(position.x, position.y, container.images[1]).setImmovable();
            this[containerKey].body.allowGravity = false;
        }

        this.crearBasura();
    }

    update() {

        this.basura.rotation += 0.01;

        if (this.basura.y > 800) {
            this.setTextureSerio();
            this.restaVida();
        }

        if (this.score === 15) {
            this.toWin();
        }
    }

    setTextureSerio() {
        for (let containerKey in this.containers) {
            const container = this.containers[containerKey];
            const imageName = container.images[2];
            this[containerKey].setTexture(imageName);
        }

    }

    setTextureRiure() {
        for (let containerKey in this.containers) {
            const container = this.containers[containerKey];
            const imageName = container.images[1];
            this[containerKey].setTexture(imageName);
        }
    }

    endGame() {
        this.scene.start('fin');
    }

    toWin() {
        this.scene.start('victoria');
    }

    restaVida() {
        this.lives--;
        this.livesText.setText(' INTENTOS : ' + this.lives);

        if (this.lives > 0) {
            this.crearBasura();
        } else {
            this.endGame();
        }
    }

    agregarColision(contenedor, basura) {
        this.physics.add.collider(contenedor, basura, this.tirarBasura, null, this);
    }

    crearBasura() {
        var numero = Math.floor(Math.random() * this.waste.length);

        this.basura = this.physics.add.image(Phaser.Math.Between(100, 1100), 0, this.waste[numero]).setInteractive({ cursor: 'pointer' });

        for (const [key, value] of Object.entries(this.containers)) {
            this.agregarColision(this[key], this.basura);
        }

        this.input.setDraggable(this.basura);

        this.input.on('dragstart', function (pointer, gameObject) {
            this.children.bringToTop(gameObject);
        }, this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.basura.y === 570 ? this.input.off('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        }) : null;
    }

    tirarBasura() {
        this.score++;
        this.setTextureRiure();
        this.basura.destroy();
        this.scoreText.setText('PUNTOS : ' + this.score);
        this.crearBasura();
    }

    buscarCubo(residuo) {
        const contenedor = this.wasteToContainerMapping[residuo];

        if (!contenedor) {
            console.error(`No se encontró un contenedor para el residuo ${residuo}`);
            return null;
        }

        return contenedor;
    }
}