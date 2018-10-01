const colors = require('../../dictionaries/colors');
const bagUtils = require('./bag.utils');

describe(`server/classes/bag/bag.utils.js`, () => {
  describe(`generate`, () => {
    const generated = bagUtils.generate();

    it(`should have 100 tiles`, () => {
      expect(generated.length).toBe(100);
    });

    it(`should have 20 tiles for each color`, () => {
      colors.forEach((color, index) => {
        const filtered = generated.filter(tile => tile === index).length;

        expect(filtered).toBe(20);
      })
    });
  });
});
