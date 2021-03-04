import Phaser from 'phaser';
// import { Menu, MenuItem, HeroesMenu, ActionsMenu, EnemiesMenu } from './../game/Menus';
import Message from './../game/Message'


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
        this.actionsMenu = new ActionsMenu(100, 153, this);
        this.enemiesMenu = new EnemiesMenu(8, 153, this);

        // the currently selected menu 
        this.currentMenu = this.actionsMenu;

        // add menus to the container
        this.menus.add(this.heroesMenu);
        this.menus.add(this.actionsMenu);
        this.menus.add(this.enemiesMenu);

        this.battleScene = this.scene.get("BattleScene");

        this.remapHeroes();
        this.remapEnemies();

        this.input.keyboard.on("keydown", this.onKeyInput, this);

        this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

        this.events.on("SelectEnemies", this.onSelectEnemies, this);

        this.events.on("Enemy", this.onEnemy, this);
        this.message = new Message(this, this.battleScene.events);
        this.add.existing(this.message);

        this.battleScene.nextTurn();
  }

  onEnemy(index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection('attack', index);
    }

    onSelectEnemies() {
        this.currentMenu = this.enemiesMenu;
        this.enemiesMenu.select(0);
    }

  onPlayerSelect(id) {
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
    }

    
    remapHeroes() {
        var heroes = this.battleScene.heroes;
        this.heroesMenu.remap(heroes);
    }

    remapEnemies() {
        var enemies = this.battleScene.enemies;
        this.enemiesMenu.remap(enemies);
    }

    onKeyInput(event) {
        if(this.currentMenu) {
            if(event.code === "ArrowUp") {
                this.currentMenu.moveSelectionUp();
            } else if(event.code === "ArrowDown") {
                this.currentMenu.moveSelectionDown();
            } else if(event.code === "ArrowRight" || event.code === "Shift") {

            } else if(event.code === "Space" || event.code === "ArrowLeft") {
                this.currentMenu.confirm();
            } 
        }
    }
}


var MenuItem = new Phaser.Class({
    Extends: Phaser.GameObjects.Text,
    
    initialize:
            
    function MenuItem(x, y, text, scene) {
        Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: "#ffffff", align: "left", fontSize: 15});
    },
    
    select: function() {
        this.setColor("#f8ff38");
    },
    
    deselect: function() {
        this.setColor("#ffffff");
    }
    
});

var Menu = new Phaser.Class({
    Extends: Phaser.GameObjects.Container,
    
    initialize:
            
    function Menu(x, y, scene, heroes) {
        Phaser.GameObjects.Container.call(this, scene, x, y);
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.heroes = heroes;
        this.x = x;
        this.y = y;
    },     
    addMenuItem: function(unit) {
        var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem);        
    },            
    moveSelectionUp: function() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex--;
        if(this.menuItemIndex < 0)
            this.menuItemIndex = this.menuItems.length - 1;
        this.menuItems[this.menuItemIndex].select();
    },
    moveSelectionDown: function() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex++;
        if(this.menuItemIndex >= this.menuItems.length)
            this.menuItemIndex = 0;
        this.menuItems[this.menuItemIndex].select();
    },
    // select the menu as a whole and an element with index from it
    select: function(index) {
        if(!index)
            index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        this.menuItems[this.menuItemIndex].select();
    },
    // deselect this menu
    deselect: function() {        
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
    },
    confirm: function() {
        // wen the player confirms his slection, do the action
    },
    clear: function() {
        for(var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    },
    remap: function(units) {
        this.clear();        
        for(var i = 0; i < units.length; i++) {
            var unit = units[i];
            this.addMenuItem(unit.type);
        }
    }
});

// var HeroesMenu = new Phaser.Class({
//     Extends: Menu,
    
//     initialize:
            
//     function HeroesMenu(x, y, scene) {
//         Menu.call(this, x, y, scene);                    
//     }
// });

class HeroesMenu extends Menu {
    constructor(x, y, scene) {
        super(x, y, scene)
    }
}

class ActionsMenu extends Menu {
    constructor(x, y, scene) {
        super(x, y, scene)
        this.addMenuItem("Attack");
    }

    confirm() {
        this.scene.events.emit("SelectEnemies");
    }
}

class EnemiesMenu extends Menu {
    constructor(x, y, scene) {
        super(x, y, scene)
    }

    confirm() {
        this.scene.events.emit("Enemy", this.menuItemIndex);
    }
}

// var EnemiesMenu = new Phaser.Class({
//     Extends: Menu,
    
//     initialize:
            
//     function EnemiesMenu(x, y, scene) {
//         Menu.call(this, x, y, scene);        
//     },       
//     confirm: function() {        
//         this.scene.events.emit("Enemy", this.menuItemIndex);
//     }
// });

