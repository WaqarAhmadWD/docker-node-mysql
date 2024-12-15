const _ = require('lodash');

exports.generateCode = (length = 4) => {
  return _.random(100000, 999999).toString();
};
