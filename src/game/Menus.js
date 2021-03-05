import Phaser from 'phaser';

class MenuItem extends Phaser.GameObjects.Text {
    constructor(x, y, text, scene) {
        super(scene, x, y, text, { color: "#ffffff", align: "left", fontSize: 15 })
    }

    select() {
        this.setColor("#f8ff38");
    }

    deselect() {
        this.setColor("#ffffff");
    }

    // when the associated enemy or player unit is killed
    unitKilled() {
        this.active = false;
        this.visible = false;
    }
}

class Menu extends Phaser.GameObjects.Container {
    constructor(x, y, scene, heroes) {
        super(scene, x, y)
        this.menuItems = [];
        this.menuItemIndex = 0;
        this.x = x;
        this.y = y;
        this.selected = false;
    }

    addMenuItem(unit) {
        var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
        this.menuItems.push(menuItem);
        this.add(menuItem);
        return menuItem;
    }
    // menu navigation 
    moveSelectionUp() {
        this.menuItems[this.menuItemIndex].deselect();
        do {
            this.menuItemIndex--;
            if (this.menuItemIndex < 0)
                this.menuItemIndex = this.menuItems.length - 1;
        } while (!this.menuItems[this.menuItemIndex].active);
        this.menuItems[this.menuItemIndex].select();
    }
    moveSelectionDown() {
        this.menuItems[this.menuItemIndex].deselect();
        do {
            this.menuItemIndex++;
            if (this.menuItemIndex >= this.menuItems.length)
                this.menuItemIndex = 0;
        } while (!this.menuItems[this.menuItemIndex].active);
        this.menuItems[this.menuItemIndex].select();
    }
    // select the menu as a whole and highlight the choosen element
    select(index) {
        if (!index)
            index = 0;
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = index;
        while (!this.menuItems[this.menuItemIndex].active) {
            this.menuItemIndex++;
            if (this.menuItemIndex >= this.menuItems.length)
                this.menuItemIndex = 0;
            if (this.menuItemIndex == index)
                return;
        }
        this.menuItems[this.menuItemIndex].select();
        this.selected = true;
    }
    // deselect this menu
    deselect() {
        this.menuItems[this.menuItemIndex].deselect();
        this.menuItemIndex = 0;
        this.selected = false;
    }
    confirm() {
        // when the player confirms his slection, do the action
    }
    // clear menu and remove all menu items
    clear() {
        for (var i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].destroy();
        }
        this.menuItems.length = 0;
        this.menuItemIndex = 0;
    }
    // recreate the menu items
    remap(units) {
        this.clear();
        for (var i = 0; i < units.length; i++) {
            var unit = units[i];
            unit.setMenuItem(this.addMenuItem(unit.type));
        }
        this.menuItemIndex = 0;
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
        this.addMenuItem("Attack");
    }
    confirm() {
        // we select an action and go to the next menu and choose from the enemies to apply the action
        this.scene.events.emit("SelectedAction");
    }
}

class EnemiesMenu extends Menu {
    constructor(x, y, scene) {
        super(x, y, scene)
    }

    confirm() {
        // the player has selected the enemy and we send its id with the event
        this.scene.events.emit("Enemy", this.menuItemIndex);
    }
}

export {Menu, MenuItem, HeroesMenu, ActionsMenu, EnemiesMenu}