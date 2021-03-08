import Phaser from 'phaser'
import MenuItem from '../menus/menuItem'

test('MenuItem is a subclass of Menu', () => {
  expect(MenuItem.prototype instanceof Phaser.GameObjects.Text).toBe(true);
});