const colors = require('../../dictionaries/colors');

class FactoryDisplay {
  constructor() {
    this._store = [];
  }

  set(range) {
    if(!Array.isArray(range)) throw 'set for factory display should be Array';
    if(range.length !== 4) throw 'range should has length 4';
    if(this._store.length) throw 'range can be set only if _store is empty';

    range.forEach((color) => {
      if (color < 0 || color > colors.length-1) throw 'color should be correct in range';
    });

    this._store.splice(0, 4, ...range);
  }
}

module.exports = FactoryDisplay;
