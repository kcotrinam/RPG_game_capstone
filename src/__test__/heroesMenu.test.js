import Menu from '../menus/menu';
import HeroesMenu from '../menus/heroesMenu';

test('EnemiesMenu should be a subclass of Menu', () => {
  expect(HeroesMenu.prototype instanceof Menu).toBe(true);
});