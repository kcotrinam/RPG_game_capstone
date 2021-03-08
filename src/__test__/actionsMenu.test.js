import Menu from '../menus/menu';
import ActionsMenu from '../menus/actionsMenu';

test('ActionsMenu is a subclass of Menu', () => {
  expect(ActionsMenu.prototype instanceof Menu).toBe(true);
});