const bagUtils = require('./bag.utils');

class Bag {
  constructor() {
    this._bag = [];
    this._prepare();
  }

  _prepare() {
    this._bag = bagUtils.generate();

    this.shuffle();
  }

  get() {
    const result = [];

    if (this._bag.length < 4) this._prepare();

    while(result.length < 4) {
      result.push(this._bag.shift());
    }

    return result;
  }

  shuffle() {
    for(let i = this._bag.length; i >= 0; i--) {
      const index = Math.floor(Math.random() * i);

      const val = this._bag.splice(index, 1);
      this._bag.push(val);
    }
  }
}

module.exports = Bag;
