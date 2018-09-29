const levels = require('../../dictionaries/levels');
const colors = require('../../dictionaries/colors');

function createRules(level) {
  if (level !== levels.EASY) return false;

  const col = colors.slice().map((item, index) => index);
  const arr = new Array(col.length);

  for (let i = 0; i < colors.length; i++) {
    arr[i] = col.slice();
    const el = col.shift();
    col.push(el);
  }

  return arr;
}

const wallUtils = {
  createRules
};

module.exports = wallUtils;
