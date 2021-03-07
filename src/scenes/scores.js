/* eslint-disable import/no-cycle */

import Phaser from 'phaser';
import game from '../index';
import {scoreBoard} from '../api/scoreboard';

export default class Scores extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  backButtonAction() {
    this.backButton.on('pointerdown', () => {
      this.scene.start('Game');
    });
  }

  displayLeaders(list) {
    for (let i = 1; i < 6; i += 1) {
      if (i >= list.length) {
        break;
      }
      this.add.text(
        game.config.width / 2,
        70 + 25 * i,
        `${list[i].user}   ${list[i].score}`, {
          fill: '#ffff00',
          fontSize: '24px',
          fontFamily: 'Georgias, Times, serif',
        },
      ).setOrigin(0.5);
    }
  }

  async create() {
    this.cameras.main.setBackgroundColor('#567d46');
    this.add.text(
      game.config.width / 2,
      25,
      'Monsters Hunter', {
        fill: '#ffffff',
        fontSize: '32px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

      const scores = await scoreBoard()
      this.displayLeaders(scores);

    this.backButton = this.add.text(
      game.config.width / 2,
      game.config.height - 20,
      'Back', {
        fill: '#ffffff',
        fontSize: '24px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

    this.backButton.setInteractive();
    this.backButtonAction();
  }
}