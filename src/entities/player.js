import Unit from './unit';

export default class PlayerCharacter extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage, 1.3);

    this.flipX = true;
    this.setScale(2);
  }
}