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
    if (this._level === levels.EASY) {
      const ruleCol = this._rules[columnIndex][rowIndex];

      if (isNaN(columnIndex)) columnIndex = ruleCol;
      if (columnIndex !== ruleCol) return false;

      if (this._wall[rowIndex][columnIndex]) return false;
      else return true;
    }

    if (this._wall[rowIndex].indexOf(colors[colorIndex]) !== -1) return false;

    if (columnIndex) {
      let result = true;

      this._wall.forEach(row => {
        if (row[columnIndex] === colors[colorIndex]) result = false;
      })

      return result;
    }

    for(let col= 0; col < 5; col++) {
      if (this._wall[rowIndex][col]) continue;

      let result = true;

      this._wall.forEach(row => {
        if (row[columnIndex] === colors[colorIndex]) result = false;
      });

      if (result) return true;
    }
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
