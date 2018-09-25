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
    let wall, rulesMock;
    const color = 0;
    const row = 0;
    const column = 0;

    describe('on EASY level', () => {
      rulesMock = [
        [0, 1, 2, 3, 4],
        [1, 2, 3, 4, 0],
        [2, 3, 4, 0, 1],
        [3, 4, 0, 1, 2],
        [4, 0, 1, 2, 3],
      ];

      utils.createRules.mockImplementation(rulesMock);

      beforeEach(() => {
        wall = new Wall(levels.EASY);
      });

      it('should return true if color can be placed in a row', () => {
        expect(wall.canBePlaced(color, row)).toBe(true);
      });
      it('should return false if color can\'t be placed in a row', () => {
        wall._wall[row][column] = colors[color];

        expect(wall.canBePlaced(color, row)).toBe(false);
      });
      it('should return true if color can be placed in a row[col]', () => {
        expect(wall.canBePlaced(color, row, col)).toBe(true);
      });
      it('should return false if color can\t be placed in a row[col]', () => {
        wall._wall[row][column] = colors[color];

        expect(wall.canBePlaced(color, row, col)).toBe(false);
      });
    });

    describe('on HARD level', () => {
      utils.createRules.mockImplementation(rulesMock);

      beforeEach(() => {
        wall = new Wall(levels.EASY);
      });

      it('should return true if color can be placed in a row', () => {
        expect(wall.canBePlaced(color, row)).toBe(true);
      });

      it('should return false if color can\'t be placed in a row', () => {
        wall._wall[row][column] = colors[color];

        expect(wall.canBePlaced(color, row)).toBe(false);
      });

      it('should return false if color can\'t be placed in a row because of no place', () => {
        wall._wall[0][0] = colors[1];
        wall._wall[0][1] = colors[2];
        wall._wall[0][2] = colors[3];
        wall._wall[1][3] = colors[0];
        wall._wall[2][4] = colors[0];

        expect(wall.canBePlaced(0, 0)).toBe(false);
      });

      it('should return true if color can be placed in a row[col]', () => {
        expect(wall.canBePlaced(color, row, col)).toBe(true);
      });

      it('should return false if color can\t be placed in a row[col]', () => {
        wall._wall[row][column] = colors[color];

        expect(wall.canBePlaced(color, row, col)).toBe(false);
      });
    })
  })
});
