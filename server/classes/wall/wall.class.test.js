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

  describe('canBePlaced()', () => {
    describe('EASY', () => {
      const rulesMock = [
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 0],
        [2, 3, 4, 0, 1],
        [3, 4, 0, 1, 2],
        [4, 0, 1, 2, 3],
      ];

      beforeAll(()=> {
        utils.createRules.mockImplementation(rulesMock);
      });

      describe(`empty board`, () => {
        beforeAll(() => {
          const wall = new Wall(levels.EASY);
        });

        for(let color = 0; color < colors.length; color++) {
          for(let row = 0; row < 5; row++) {
            it(`should be 'true' for '${colors[color]}' tile in ${row} row`, () => {
              expect(wall.canBePlaced(color, row)).toBe(true);
            });

            describe(`rule: ${colors[color]} tile on [${row}][${rulesMock[color][row]}]`, () => {
              for(let col = 0; col < 5; col++) {
                const bool = (rulesMock[color][row] === col);

                it(`should be '${bool}' for '${colors[color]}' tile in [${row}][${col}]`,() => {
                  expect(wall.canBePlaced(color, row, col)).toBe(bool);
                });
              }
            });
          }
        }
      });

      describe(`not empty board`, () => {
        const color = 0;
        const row = 0;
        const col = rulesMock[color][row];

        beforeEach(() => {
          wall = new Wall(levels.EASY);

          wall._wall[row][col] = colors[color];
        });

        describe(`wall[${row}][${col}] = ${colors[color]}`, () => {
          it(`should be false for ${colors[color]} tile on ${row} row`, () => {
            expect(wall.canBePlaced(color, row)).toBe(false);
          });
          it(`should be false for ${colors[color]} tile on [${row +1}][${col}]`, () => {
            expect(wall.canBePlaced(color, row + 1, col)).toBe(false);
          });
          it(`should be true for ${colors[color]} tile on [${row +1}][${col+1}]`, () => {
            expect(wall.canBePlaced(color, row + 1, col +1)).toBe(false);
          });
        });
      });
    });

    describe('HARD', () => {
      const rulesMock = undefined;

      beforeAll(() => {
        utils.createRules.mockImplementation(rulesMock);
      });

      describe(`empty board`, ()=> {
        beforeAll(() => {
          wall = new Wall(levels.HARD);
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
            }
          }
        }
      });

      describe(`not empty board`,() => {
        describe(`easy`, () => {
          const color = 0;
          const row = 0;
          const col = 0;

          beforeEach(() => {
            wall = new Wall(levels.EASY);

            wall._wall[row][col] = colors[color];
          });

          describe(`wall[${row}][${col}] = ${colors[color]}`, () => {
            it(`should be false for ${colors[color]} tile on ${row} row`, () => {
              expect(wall.canBePlaced(color, row)).toBe(false);
            });
            it(`should be false for ${colors[color]} tile on [${row +1}][${col}]`, () => {
              expect(wall.canBePlaced(color, row + 1, col)).toBe(false);
            });
            it(`should be true for ${colors[color]} tile on [${row +1}][${col+1}]`, () => {
              expect(wall.canBePlaced(color, row + 1, col +1)).toBe(false);
            });
          })
        });
        describe(`not easy`, () => {
          beforeEach(() => {
            wall = new Wall(levels.EASY);

            wall._wall[0][0] = colors[0];
            wall._wall[0][1] = colors[1];
            wall._wall[0][2] = colors[2];
            wall._wall[1][3] = colors[3];
            wall._wall[1][4] = colors[3];
          });

          for(let i = 0; i < 5; i++) {
            it(`should return false for ${colors[3]} tile for ${i} column`, () => {
              expect(wall.canBePlaced(3,0,i)).toBe(false);
            });
          }
        });
      })
    });
  });

});
