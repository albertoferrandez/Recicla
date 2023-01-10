
export class Game extends Phaser.Scene {

    residus = ['abrir-caja', 'anteojos', 'biberon', 'bolsa', 'carta', 'cascara-de-huevo', 'hedor', 'comida-enlatada', 'botella-rota', 'cigarrillo', 'comida-enlatada', 'espina-de-pescado', 'lata-de-refresco', 'lata-de-refresco', 'leche', 'papel', 'periodico', 'vidrio-roto', 'yogur', 'tv-vintage', 'las-pilas', 'sofa', 'bateria-de-coche', 'comida-enlatada'];

    cuboBlau = ['guiñoblau', 'riureblau', 'serioblau'];
    cuboGris = ['guiñogris', 'riuregris', 'seriogris'];
    cuboGroc = ['guiñogroc', 'riuregroc', 'seriogroc'];
    cuboVerd = ['guinoverd', 'riureverd', 'serioverd'];
    cuboEco = ['guinoecopark', 'riureecoparc', 'serioecoparc'];

    creats = 0;

    constructor() {
        super({key: 'game'});
    }

    init() {
        this.score = 0;
        this.lives = 5;
    }

    preload() {

        this.load.image('background', 'imatges/fondo.jpg');


        for (var i = 0; i < this.residus.length; i++) {
            this.load.image(this.residus[i], 'imatges/' + this.residus[i] + '.png');
        }

        for (var i = 0; i < this.cuboBlau.length; i++) {
            this.load.image(this.cuboBlau[i], 'imatges/blau/' + this.cuboBlau[i] + '.png');
        }
        for (var i = 0; i < this.cuboGris.length; i++) {
            this.load.image(this.cuboGris[i], 'imatges/gris/' + this.cuboGris[i] + '.png');
        }
        for (var i = 0; i < this.cuboGroc.length; i++) {
            this.load.image(this.cuboGroc[i], 'imatges/groc/' + this.cuboGroc[i] + '.png');
        }
        for (var i = 0; i < this.cuboVerd.length; i++) {
            this.load.image(this.cuboVerd[i], 'imatges/verds/' + this.cuboVerd[i] + '.png');
        }

        for (var i = 0; i < this.cuboEco.length; i++) {
            this.load.image(this.cuboEco[i], 'imatges/ecoparc/' + this.cuboEco[i] + '.png');
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

        this.azul = this.physics.add.image(100, 600, 'riureblau').setImmovable();
        this.amarillo = this.physics.add.image(350, 600, 'riuregroc').setImmovable();
        this.verde = this.physics.add.image(600, 600, 'riureverd').setImmovable();
        this.gris = this.physics.add.image(850, 600, 'riuregris').setImmovable();
        this.eco = this.physics.add.image(1100, 600, 'riureecoparc').setImmovable();

        this.azul.body.allowGravity = false;
        this.amarillo.body.allowGravity = false;
        this.verde.body.allowGravity = false;
        this.gris.body.allowGravity = false;
        this.eco.body.allowGravity = false;

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
        this.azul.setTexture('serioblau');
        this.amarillo.setTexture('seriogroc');
        this.verde.setTexture('serioverd');
        this.gris.setTexture('seriogris');
        this.eco.setTexture('serioecoparc');
    }

    setTextureRiure() {
        this.azul.setTexture('riureblau');
        this.amarillo.setTexture('riuregroc');
        this.verde.setTexture('riureverd');
        this.gris.setTexture('riuregris');
        this.eco.setTexture('riureecoparc');
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

    crearBasura() {

        var numero = Math.floor(Math.random() * this.residus.length);
        var ncubo = this.BuscarCubo(this.residus[numero]);

        this.basura = this.physics.add.image(Phaser.Math.Between(100, 1100), 0, this.residus[numero]).setInteractive({cursor: 'pointer'});

        if (ncubo === 'riuregroc') {
            console.log('entraama');
            this.physics.add.collider(this.amarillo, this.basura, this.tirarBasura, null, this);
        }

        if (ncubo === 'riureverd') {
            console.log('entraverde');
            this.physics.add.collider(this.verde, this.basura, this.tirarBasura, null, this);
        }

        if (ncubo === 'riureblau') {
            console.log('entraazul');
            this.physics.add.collider(this.azul, this.basura, this.tirarBasura, null, this);
        }

        if (ncubo === 'riuregris') {
            console.log('entrargris');
            this.physics.add.collider(this.gris, this.basura, this.tirarBasura, null, this);
        }

        if (ncubo === 'riureecoparc') {
            console.log('entrareco');
            this.physics.add.collider(this.eco, this.basura, this.tirarBasura, null, this);
        }

        this.input.setDraggable(this.basura);
        var _this = this;
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
        this.scoreText.setText(' PUNTOS : ' + this.score);
        this.crearBasura();
    }

    BuscarCubo(residuo)
    {

        var cubos = [
            {residu: 'abrir-caja', cubo: 'riureblau'},
            {residu: 'anteojos', cubo: 'riureverd'},
            {residu: 'biberon', cubo: 'riuregris'},
            {residu: 'bolsa', cubo: 'riuregroc'},
            {residu: 'carta', cubo: 'riureblau'},
            {residu: 'cascara-de-huevo', cubo: 'riuregris'},
            {residu: 'hedor', cubo: 'riuregris'},
            {residu: 'cigarrillo', cubo: 'riuregris'},
            {residu: 'botella-rota', cubo: 'riureverd'},
            {residu: 'espina-de-pescado', cubo: 'riuregris'},
            {residu: 'lata-de-refresco', cubo: 'riuregroc'},
            {residu: 'leche', cubo: 'riuregroc'},
            {residu: 'papel', cubo: 'riureblau'},
            {residu: 'periodico', cubo: 'riureblau'},
            {residu: 'vidrio-roto', cubo: 'riureverd'},
            {residu: 'yogur', cubo: 'riuregroc'},
            {residu: 'tv-vintage', cubo: 'riureecoparc'},
            {residu: 'sofa', cubo: 'riureecoparc'},
            {residu: 'las-pilas', cubo: 'riureecoparc'},
            {residu: 'bateria-de-coche', cubo: 'riureecoparc'},
            {residu: 'comida-enlatada', cubo: 'riuregroc'}
        ];

        for (var i = 0; i < cubos.length; i++) {

            if (residuo === cubos[i].residu) {

                var salida = cubos[i].cubo;
                console.log(salida + residuo);
            }
        }
        return salida;
    }

}