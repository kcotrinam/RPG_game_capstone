/* eslint-disable import/no-cycle */

import Phaser from 'phaser';
import game from '../index';
import { setScore } from '../api/scoreboard';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  backButtonAction() {
    this.backButton.on('pointerdown', () => {
      window.score = 0;
      this.scene.start('Game');
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#567d46');

    window.worldMusic = false;
    window.battleMusic = false;
    window.bgMusic = true;
    game.worldMusic.stop();
    game.battleMusic.stop();
    game.bgMusic.play();

    this.add.text(
      game.config.width / 2,
      20,
      'Thanks for Playing', {
        fill: '#ffffff',
        fontSize: '32px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      50,
      'Monsters Hunter', {
        fill: '#ffffff',
        fontSize: '32px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      100,
      'Your Score:', {
        fill: '#ffffff',
        fontSize: '24px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      140,
      `${window.playerName}: ${window.score}`, {
        fill: '#ffffff',
        fontSize: '24px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

    this.backButton = this.add.text(
      game.config.width / 2,
      game.config.height - 20,
      'Back to Main Menu', {
        fill: '#ffffff',
        fontSize: '24px',
        fontFamily: 'Georgias, Times, serif',
      },
    ).setOrigin(0.5);

    setScore(window.playerName, window.score);

    this.backButton.setInteractive();
    this.backButtonAction();
  }
}