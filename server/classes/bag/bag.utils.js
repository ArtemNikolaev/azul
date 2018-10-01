const colors = require('../../dictionaries/colors');

function generate() {
  const result = [];

  colors.forEach((color, index) => {
    const colorArr = new Array(20);
    colorArr.fill(index);

    result.push(...colorArr);
  });

  return result;
}

const bagUtils = {
  generate
};

module.exports = bagUtils;
