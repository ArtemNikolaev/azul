const levels = require('../../dictionaries/levels');

const utils = require('./wall.utils');

describe('server/classes/wall/wall.utils.js', () => {
  describe('createRules()', () => {
    const rulesMock = [
     [0, 1, 2, 3, 4],
     [1, 2, 3, 4, 0],
     [2, 3, 4, 0, 1],
     [3, 4, 0, 1, 2],
     [4, 0, 1, 2, 3],
    ];

    for (let i = 0; i <= Object.keys(levels).length + 5; i++) {
      const level = (levels.EASY === i) ? 'EASY' : 'HARD';
      const rulesValue = (level === 'EASY') ? rulesMock : undefined;

      it(`should return correct rules for ${level} level with ${i} value`, () => {
        expect(utils.createRules(levels[level])).toEqual(rulesValue);
      });
    }

  });
});
