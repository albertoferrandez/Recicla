import { Inicio } from './inicio.js';
import { Game } from './game.js';
import { Fin } from './fin.js';
import { Victoria } from './victoria.js';

const config = {
    parent: "recicla",
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    scene: [Inicio, Game, Fin, Victoria],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 60},
            debug: false,
            timeScale: 1
        }        
    }
};

var game = new Phaser.Game(config);