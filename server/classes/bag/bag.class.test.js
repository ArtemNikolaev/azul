const Bag = require('./bag.class');
const bagUtils = require('./bag.utils');

describe(`server/classes/bag/bag.class.js`, () => {
  let bag;
  const generatedMock = [
    1,
    2, 2,
    3, 3, 3,
    4, 4, 4, 4,
    5, 5, 5, 5, 5,
    6, 6, 6, 6, 6, 6,
    7, 7, 7, 7, 7, 7, 7
  ];

  jest.spyOn(bagUtils, 'generate')
    .mockImplementation(() => generatedMock);

  beforeEach(() => {
    bag = new Bag();
  });

  afterAll(() => {
    bagUtils.generate.mockRestore();
  });

  describe(`_prepare()`, () => {
    beforeEach(() => {
      bagUtils.generate.mockClear();
      bag = new Bag();

      jest.spyOn(bag, 'shuffle');
    });

    afterEach(() => {
      bag.shuffle.mockRestore();
    });

    it(`should call 'generate' util`, () => {
      expect(bagUtils.generate).toHaveBeenCalledTimes(1);
    });

    it(`should have correct '_bag'`, () => {
      expect(bag._bag).toEqual(generatedMock);
    });

    it(`should call 'shuffle' function`, () => {
      bag._prepare();

      expect(bag.shuffle).toHaveBeenCalledTimes(1);
    });
  });

  describe(`get`, () => {
    beforeEach(()=> {
      jest.spyOn(bag, '_prepare');
    });

    afterEach(() => {
      bag._prepare.mockRestore();
    });

    it(`should return 4 tiles`, () => {
      expect(bag.get().length).toBe(4);
    });

    it(`should remove 4 tiles from _bag`, () => {
      const length = bag._bag.length;

      bag.get();

      expect(bag._bag.length).toBe(length - 4);
    });

    it(`should call _prepare() for empty bag`, () => {
      while(bag._bag.length >= 4) {
        bag.get();
      }
      bag.get();

      expect(bag._prepare).toHaveBeenCalledTimes(1);
    });
  });

  describe(`shuffle()`, () => {
    beforeEach(() => {
      bag.shuffle();
    });

    it(`should have same length`, () => {
      expect(bag._bag.length).toBe(generatedMock.length);
    });

    it(`should have same tiles`, () => {
      const min = Math.min(...generatedMock);
      const max = Math.max(...generatedMock);

      for(let i = min; i <= max; i++) {
        const bagL = bag._bag.filter(tile => tile === i).length;
        const mockL = generatedMock.filter(tile => tile === i).length;

        expect(bagL).toBe(mockL);
      }
    })
  });
});
