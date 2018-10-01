const Display = require('./factoryDisplay.class');

describe(`server/classes/factory-display/factoryDisplay.class.js`, () => {
  let display;

  beforeEach(() => {
    display = new Display();
  });

  describe(`constructor()`, () => {
    it(`should create emptе '_store'`, () => {
      expect(display._store.length).toBe(0);
    });
  });

  describe(`set()`, () => {
    it(`should set '_store' value`, () => {
      const testSet = [0, 1, 2, 3];
      display.set(testSet);
      expect(display._store).toEqual(testSet);
    });

    describe(`error`, () => {
      it(`should throw if input not array`, () => {
        expect(display.set).toThrow('set for factory display should be Array');
        expect(() => display.set('bla')).toThrow('set for factory display should be Array');
        expect(() => display.set(1)).toThrow('set for factory display should be Array');
      });

      it(`should throw if input !== 4 length`, () => {
        expect(() => display.set([0,1,2,3,4])).toThrow();

        display._store.splice(0, 4);

        expect(() => display.set([0])).toThrow();
      });

      it(`should throw if '_store' not empty`, () => {
        display.set([0,1,2,3]);

        expect(() => display.set([0,1,2,3])).toThrow();
      });

      it(`should throw if tiles has unexisted colol`, () => {
        expect(() => display.set([500, 500, 500, 500])).toThrow();
      });
    });
  });

  describe(`get()`, () => {
    it(`should return correct data`, () => {
      display._store = [0, 1, 2, 3];

      expect(display.get(0)).toEqual({
        player: [0],
        center: [1,2,3]
      })
    });

    describe(`error`, () => {
      it(`should throw if no color`, () => {
        expect(() => display.get()).toThrow();
      });

      it(`should throw if color not exist`, () => {
        display._store = [0,0,0,0];

        expect(() => display.get(1)).toThrow();
      });
    })
  });
});