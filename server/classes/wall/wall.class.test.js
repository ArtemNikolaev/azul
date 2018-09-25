/*
* canBePlaced
* всегда должен быть цвет
* всегда должна быть строка
* легкий: колонка всегда undefined, иначе исключение
* сложный: колонка всегда number, иначе исключение
* сложный: если колонка занята, мессадж на клиент об ошибке
* правильные варианты тру для легкого
* несколько edge case для сложного
*
* place
* всегда вызывает canBePlaced
* всегда возвращает правильный подсчёт очков
*
* rules
* легкий: col это number
* сложный: col это массив чисел
* сложный: place должен удалять значение по горизонтали и вертикали
*
*
* у легкого уровня сложности готовые rules
* у сложного уровня сложности рулс не готовые
*
* для легкой игры достаточно только строки для заполнения
* неправильный тайл возвращает ошибку и генерирует исключение
*
* для сложной игры колонка должна быть указана всегда
* неуказанная колонка генерирует исключение
*
* */
const Wall = require('./wall.class');
const levels = require('../../dictionaries/levels');
const colors = require('../../dictionaries/colors');

const utils = require('./wall.utils');
jest.mock('./wall.utils');

describe('server/classes/wall/wall.class.js', () => {
  describe('constructor()', () => {
    const rules = undefined;

    const wall = [
      new Array(5),
      new Array(5),
      new Array(5),
      new Array(5),
      new Array(5)
    ];

    utils.createRules.mockImplementation(rules);

    it(`should create EASY level Wall for undefined value`, () => {
      const wallObj = new Wall();

      expect(wallObj._level).toBe(levels.EASY);
      expect(wallObj._wall).toEqual(wall);
      expect(wallObj._rules).toEqual(rules);
    });

    it(`should create EASY level Wall for STRING value`, () => {
      const wallObj = new Wall('BLA');

      expect(wallObj._level).toBe(levels.EASY);
      expect(wallObj._wall).toEqual(wall);
      expect(wallObj._rules).toEqual(rules);
    });

    for (let i = 0; i <= Object.keys(levels).length + 5; i++) {
      const level = (levels.HARD === i) ? 'HARD' : 'EASY';

      it(`should create ${level} level Wall for ${i} value`, () => {
        const wallObj = new Wall(i);
        expect(wallObj._level).toBe(levels[level]);
        expect(wallObj._wall).toEqual(wall);
        expect(wallObj._rules).toEqual(rules);
      });
    }
  });

  describe('canBePlaced() method', () => {
    describe('on EASY level', () => {
      const rulesMock = [
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 0],
        [2, 3, 4, 0, 1],
        [3, 4, 0, 1, 2],
        [4, 0, 1, 2, 3],
      ];

      beforeEach(() => {
        wall = new Wall(levels.EASY);

        utils.createRules.mockImplementation(rulesMock);
      });

      for(let color = 0; color < colors.length; color++) {
        for(let row = 0; row < 5; row++) {
          it(`should return 'true' for '${colors[color]}' tile in ${row} row`, () => {
            expect(wall.canBePlaced(color, row)).toBe(true);
          });

          for(let col = 0; col < 5; col++) {
            const bool = (rulesMock[color][row] === col);

            it(`should return '${bool}' for '${colors[color]}' tile in [${row}][${col}]`,() => {
              expect(wall.canBePlaced(color, row, col)).toBe(bool);
            });

            for(let colorI = 0; colorI < colors.length; colorI++) {
              for(let rowI = 0; rowI < 5; rowI++) {
                for(let colI = 0; colI < 5; colI++) {
                  
                }
              }
            }
          }
        }
      }
    });

    describe('on HARD level', () => {
      const rulesMock = undefined;

      beforeEach(() => {
        wall = new Wall(levels.HARD);

        utils.createRules.mockImplementation(rulesMock);
      });

      for(let color = 0; color < colors.length; color++) {
        for(let row = 0; row < 5; row++) {
          it(`should return 'true' for '${colors[color]}' tile in ${row} row`, () => {
            expect(wall.canBePlaced(color, row)).toBe(true);
          });

          for(let col = 0; col < 5; col++) {
            it(`should return 'true' for '${colors[color]}' tile in [${row}][${col}]`, () => {
              expect(wall.canBePlaced(color, row, col)).toBe(true);
            });

            /*for(let colorI = 0; colorI < colors.length; colorI++) {
              for(let rowI = 0; rowI < 5; rowI++) {
                for(let colI = 0; colI < 5; colI++) {
                  const sameColor = (colorI === color);
                  const sameRow = (rowI === row);
                  const sameCol = (colI === col);

                  const bool = (sameColor && (sameRow || sameCol));

                  it(`should return '${bool}' for '${colors[color]}' tile in [${row}][${col}]`,() => {
                  wall._wall[row][col] = color;

                    expect(wall.canBePlaced(color, row, col)).toBe(bool);
                  });
                }
              }
            }*/
          }
        }
      }
    });
  });

});
