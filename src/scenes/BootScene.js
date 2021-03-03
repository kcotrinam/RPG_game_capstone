import Phaser from 'phaser';
import spriteSheet from './../assets/spritesheet.png'
import map from './../assets/map/map.json'
import players from './../assets/hero.png'

export default class BootScene extends Phaser.Scene {
  constructor() { 
    super({key: 'BootScene'})
  }

  preload() {
    // map tiles
    this.load.image('tiles', spriteSheet);
    
    // map in json format
    this.load.tilemapTiledJSON('map', map);
    
    // our two characters
    this.load.spritesheet('player', players, { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    // start the WorldScene
    this.scene.start('WorldScene');
    }
}