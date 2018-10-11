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

  get(color) {
    const result = {
      player: [],
      center: []
    }

    if (this._store.indexOf(color) === -1) throw 'color should exist in factory display';

    while(this._store.length) {
      const storeCol = this._store.shift();
      if (storeCol === color) result.player.push(storeCol);
      else result.center.push(storeCol);
    }

    return result;
  }
}

module.exports = FactoryDisplay;
