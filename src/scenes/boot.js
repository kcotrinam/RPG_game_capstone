/* eslint-disable import/no-cycle */

import Phaser from 'phaser';
import game from '../index';
import spritesheet from './../assets/spritesheet.png';
import map from './../assets/map/map.json';
import players from './../assets/RPG_assets.png';
import blueDragon from './../assets/dragonblue.png';
import orangeDragon from './../assets/dragonorange.png';
import bat from './../assets/bat.gif';
import ghost from './../assets/ghost.gif';
import battleSong from './../assets/audios/Battle.mp3'
import introSong from './../assets/audios/Intro.mp3'
import worldSong from './../assets/audios/WorldMap.wav'


export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('tiles', spritesheet);

    // map in json format
    this.load.tilemapTiledJSON('map', map);

    // our two characters
    this.load.spritesheet('player', players, { frameWidth: 16, frameHeight: 16 });

    // enemies
    this.load.image('dragonblue', blueDragon);
    this.load.image('dragonorange', orangeDragon);
    this.load.image('bat', bat);
    this.load.image('ghost', ghost);

    // audios
    this.load.audio('gameIntro', introSong);
    this.load.audio('worldMusic', worldSong);
    this.load.audio('battleMusic', battleSong);
  }

  create() {
    window.bgMusic = false;
    window.worldMusic = false;
    window.battleMusic = false;

    game.battleMusic = this.sound.add('battleMusic', { loop: true });
    game.worldMusic = this.sound.add('worldMusic', { loop: true });
    game.bgMusic = this.sound.add('gameIntro', { loop: true });

    this.scene.start('Game');
  }
}
