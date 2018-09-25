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

const utils = require('./wall.utils');
jest.mock('./wall.utils');

describe('server/classes/wall/wall.class.js', () => {
  describe('constructor', () => {
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
});
