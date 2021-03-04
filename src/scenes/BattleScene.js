import Phaser from 'phaser';
import Unit from './../game/Unit'
import Enemy from './../game/Enemy'
import PlayerCharacter from './../game/Character'

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super({key: 'BattleScene'})
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    const warrior = new PlayerCharacter(this, 250, 50, 'player', 1, 'Warrior', 100, 20);        
    this.add.existing(warrior);

    const mage = new PlayerCharacter(this, 250, 100, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);

    //create dragons
    const dragonblue = new Enemy(this, 50, 50, 'dragonblue', null, 'Dragon', 50, 3);
    this.add.existing(dragonblue);
    
    const dragonOrange = new Enemy(this, 50, 100, 'dragonorrange', null,'Dragon2', 50, 3);
    this.add.existing(dragonOrange);

    // array with heroes
    this.heroes = [ warrior, mage ];
    // array with enemies
    this.enemies = [ dragonblue, dragonOrange ];
    // array with both parties, who will attack
    this.units = this.heroes.concat(this.enemies);

    this.scene.launch('UIScene')
  }
}


export class UIScene extends Phaser.Scene {
  constructor(){ 
    super({key: 'UIScene'})
  }

  create() {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);        
    this.graphics.strokeRect(2, 150, 90, 100);
    this.graphics.fillRect(2, 150, 90, 100);
    this.graphics.strokeRect(95, 150, 90, 100);
    this.graphics.fillRect(95, 150, 90, 100);
    this.graphics.strokeRect(188, 150, 130, 100);
    this.graphics.fillRect(188, 150, 130, 100);
  }
}





