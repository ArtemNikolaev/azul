const levels = require('../../dictionaries/levels');
const colors = require('../../dictionaries/colors');
const levelsInt = Object.values(levels);
const utils = require('./wall.utils');

class Wall {

  /**
   * Represents a wall from game
   * and all wall manipulation
   *
   * @constructor
   * @param {number} level - level of the game
   */
  constructor(level) {
    if (!level || levelsInt.indexOf(level) === -1) { level = levels.EASY };

    this._level = level;

    this._wall = [
      new Array(5),
      new Array(5),
      new Array(5),
      new Array(5),
      new Array(5)
    ];

    this._rules = utils.createRules(level);
  }

  /**
   * Checks availabilite to put tile in the wall
   * with these data
   *
   * @param {number} color - the color of the installed tile
   * @param {number} row - [0, .., 4] row of the wall
   * @param {number|undefined} column - [undefined, 0, .., 4] col of the wall
   *
   * @returns {boolean} - able or unable
   */
  canBePlaced(colorIndex, rowIndex, columnIndex) {

  }

  /**
   * place tile in the wall
   * with these data
   *
   * @param {number} color - the color of the installed tile
   * @param {number} row - [0, .., 4] row of the wall
   * @param {number|undefined} column - [undefined, 0, .., 4] col of the wall
   *
   * @returns {array<object>} messages for FE
   */
  place(color, row, column) {

  }
}

module.exports = Wall;
