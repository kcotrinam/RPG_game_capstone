import Phaser from 'phaser';
// import { Menu, MenuItem, HeroesMenu, ActionsMenu, EnemiesMenu } from './../game/Menus';

export default class UIScene extends Phaser.Scene {
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

    // basic container to hold all menus
    this.menus = this.add.container();

    this.heroesMenu = new HeroesMenu(195, 153, this);
    
  }
}

class MenuItem extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text) {
    super(scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15})
  }

  select() {
    this.setColor('#f8ff38')
  }

  deselect() {
    this.setColor('#ffffff')
  }
}

class Menu extends Phaser.GameObjects.Container {
  constructor(x, y, scene, heroes) {
    super(x, y, scene, heroes)
    this.menuItems = [];
    this.menuItemIndex = 0;
    this.heroes = heroes;
    this.x = x;
    this.y = y;
  }

  addMenuItem(unit) {
    const menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem); 
  }

  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex--;
    if(this.menuItemIndex < 0)
      this.menuItemIndex = this.menuItems.length - 1;
    this.menuItems[this.menuItemIndex].select();
  }

  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex++;
    if(this.menuItemIndex >= this.menuItems.length)
      this.menuItemIndex = 0;
    this.menuItems[this.menuItemIndex].select();
  }

  // select the menu as a whole and an element with index from it
  select(index) {
    if(!index)
      index = 0;
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    this.menuItems[this.menuItemIndex].select();
  }

  // deselect this menu
  deselect() {        
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
  }

  confirm() {
    // wen the player confirms his slection, do the action
  }
}

class HeroesMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene)
  }
}

class ActionsMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene)
    this.addMenuItem('Attack');
  }

  confirm() {
    // do something when the player selects an action
  }
}

class EnemiesMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene)
  }

  confirm() {        
    // do something when the player selects an enemy
  }
}