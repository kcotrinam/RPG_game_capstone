import Phaser from 'phaser';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage, scale) {
    super(scene, x, y, texture, frame);
    this.type = type;
    if (type === 'Warrior') {
      this.maxHP = 100;
    }
    if (type === 'Mage') {
      this.maxHP = 50;
    }

    this.hp = hp;
    this.damage = damage; // default damage
    this.setScale(scale);

    this.living = true;
    this.menuItem = null;
  }

  setMenuItem(item) {
    this.menuItem = item;
  }

  attack(target) {
    if ((this.hp <= 40) && (this.type === 'Warrior' || this.type === 'Mage')) {
      target.takeDamage(this.damage);
      this.scene.events.emit('Message', `${this.type} Attacks ${target.type} for ${this.damage} damage`);
    } else {
      target.takeDamage(this.damage);
      this.scene.events.emit('Message', `${this.type} Attacks ${target.type} for ${this.damage} damage`);
    }
  }

  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;

      if (this.type !== 'Warrior' && this.type !== 'Mage') {
        window.score += 10;
      }

      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  }
}
