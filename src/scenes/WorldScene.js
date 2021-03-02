import Phaser from 'phaser';
import map from './../assets/map/map.json'

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super({ key: 'WorldScene' })
  }

  preload() {

  }

  create() {
    var map = this.make.tilemap({ key: 'map' });

    var tiles = map.addTilesetImage('spritesheet', 'tiles');

    var grass = map.createStaticLayer('Grass', tiles, 0, 0);
    var obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);
    this.player = this.physics.add.sprite(50, 100, 'player', 6);
  }
}