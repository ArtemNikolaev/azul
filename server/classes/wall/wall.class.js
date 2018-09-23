import level from '../../dictionaries/levels';

export default class Wall {

  /**
   * Represents a wall from game
   * and all wall manipulation
   *
   * @constructor
   * @param {number} level - level of the game
   */
  constructor(level = level.EASY) {

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
  canBePlaced(color, row, column) {

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