import BootScene from './scenes/boot';
import Game from './scenes/game';
import GetName from './scenes/getName';
import Instructions from './scenes/instructions';
import WorldScene from './scenes/world';
import BattleScene from './scenes/battle';
import UIScene from './scenes/ui'; 
import Scores from './scenes/scores';
import GameOver from './scenes/gameOver';

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 320,
  height: 240,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [
    BootScene,
    Game,
    GetName,
    Instructions,
    WorldScene,
    BattleScene,
    UIScene,
    Scores,
    GameOver,
  ],
};

const game = new Phaser.Game(config);

window.score = 0;

export default game;