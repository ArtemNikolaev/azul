const Wall = require('./wall.class');
const levels = require('../../dictionaries/levels');
const colors = require('../../dictionaries/colors');

const utils = require('./wall.utils');

describe('server/classes/wall/wall.class.js', () => {
  const hardRules = false;
  const easyRules = [
    [0, 1, 2, 3, 4],
    [1, 2, 3, 4, 0],
    [2, 3, 4, 0, 1],
    [3, 4, 0, 1, 2],
    [4, 0, 1, 2, 3]
  ];
  const createRules = jest.spyOn(utils, 'createRules').mockImplementation(
    (level) => {
      if (level === levels.EASY) return easyRules;
      else return hardRules;
    }
  );

  describe('constructor()', () => {
    const wall = [
      new Array(5),
      new Array(5),
      new Array(5),
      new Array(5),
      new Array(5)
    ];

    it(`should call createRules`, () => {
      new Wall(0);
      new Wall(1);
      expect(createRules).toHaveBeenCalledTimes(2); 
    });

    it(`should create EASY level Wall for undefined value`, () => {
      const wallObj = new Wall();

      expect(wallObj._level).toBe(levels.EASY);
      expect(wallObj._wall).toEqual(wall);
      expect(wallObj._rules).toEqual(easyRules);
    });

    it(`should create EASY level Wall for STRING value`, () => {
      const wallObj = new Wall('BLA');

      expect(wallObj._level).toBe(levels.EASY);
      expect(wallObj._wall).toEqual(wall);
      expect(wallObj._rules).toEqual(easyRules);
    });

    for (let i = 0; i <= Object.keys(levels).length + 5; i++) {
      const level = (levels.HARD === i) ? 'HARD' : 'EASY';
      const rules = (level === 'HARD') ? hardRules : easyRules;

      it(`should create ${level} level Wall for ${i} value`, () => {
        const wallObj = new Wall(i);
        expect(wallObj._level).toBe(levels[level]);
        expect(wallObj._wall).toEqual(wall);
        expect(wallObj._rules).toEqual(rules);
      });
    }
  });

  describe(`canBePlaced`, () => {
    let wallEasy;
    let wallHard;
    const color = 0;
    const row = 0;
    const col = 0;

    beforeEach(() => {
      wallEasy = new Wall(levels.EASY);
      wallHard = new Wall(levels.HARD);
    });

    describe(`(colorIndex, rowIndex, null)`, () => {
      describe(`ANY`, () => {
        it(`should return true for empty board`, () => {
          expect(wallEasy.canBePlaced(color, row)).toBe(true);
          expect(wallHard.canBePlaced(color, row)).toBe(true);
        });

        it(`should return false if tile on row exist`, () => {
          wallEasy._wall[row][0] = colors[color];
          wallHard._wall[row][0] = colors[color];

          expect(wallEasy.canBePlaced(color, row)).toBe(false);
          expect(wallHard.canBePlaced(color, row)).toBe(false);
        });
      });

      describe(`HARD`, () => {
        it(`should return false for not empty rows with crosses`, () => {
          /*
            [ [*] ,  [*], red, black, white],
            [ blue,   * , *  , *    , *    ],
            [   * , blue, *  , *    , *    ]
          */

          wallHard._wall[1][0] = colors[0];
          wallHard._wall[2][1] = colors[0];
          wallHard._wall[0][2] = colors[2];
          wallHard._wall[0][3] = colors[3];
          wallHard._wall[0][4] = colors[4];

          expect(wallHard.canBePlaced(color, row)).toBe(false);
        });
      });
    });

    describe(`(colorIndex, rowIndex, colorIndex)`, () => {
      describe(`ANY`, () => {
        it(`should return true for empty board`, () => {
          expect(wallEasy.canBePlaced(color, row, col)).toBe(true);
          expect(wallHard.canBePlaced(color, row, col)).toBe(true);
        });

        it(`should return false if tile exist in a row or col`, () => {
          wallEasy._wall[0][0] = colors[color];
          wallHard._wall[0][0] = colors[color];

          expect(wallEasy.canBePlaced(color,row,col)).toBe(false);
          expect(wallHard.canBePlaced(color,row,col)).toBe(false);

          expect(wallEasy.canBePlaced(color, row + 1, col)).toBe(false);
          expect(wallHard.canBePlaced(color, row + 1, col)).toBe(false);

          expect(wallEasy.canBePlaced(color, row, col + 1)).toBe(false);
          expect(wallHard.canBePlaced(color, row, col + 1)).toBe(false);
        })
      });

      describe(`EASY`, () => {
        it(`should return false for incorrect square`, () => {
          expect(wallEasy.canBePlaced(color, row + 1, col)).toBe(false);
          expect(wallEasy.canBePlaced(color, row, col + 1)).toBe(false);
        });
      });

      describe(`HARD`, () => {
        it(`should return false for incorrect row tile`, () => {
          wallHard._wall[row][col] = colors[color];

          expect(wallHard.canBePlaced(color, row + 1, col)).toBe(false);
        });

        it(`should return false for incorrect col tile`, () => {
          wallHard._wall[1][0] = colors[color];

          expect(wallHard.canBePlaced(color, row + 1, col)).toBe(false);
        });
      })
    });
  });
});
