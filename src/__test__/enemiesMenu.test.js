import Menu from '../menus/menu'
import EnemiesMenu from '../menus/enemiesMenu'

test('EnemiesMenu is a subclass of Menu', () => {
  expect(EnemiesMenu.prototype instanceof Menu).toBe(true);
});