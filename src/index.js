import Phaser from 'phaser';
import BattleScene from './scenes/BattleScene';
import BootScene from './scenes/BootScene'
import WorldScene from './scenes/WorldScene'
import UIScene from './scenes/UIScene'

var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 320,
    height: 240,
    zoom: 2,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false // set to true to view zones
        }
    },
    scene: [
        BootScene,
        // WorldScene,
        BattleScene,
        UIScene
    ]
};
var game = new Phaser.Game(config);