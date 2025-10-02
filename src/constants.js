const MESSAGES = {
  TREE_TOO_SMALL: 'The tree is too small... come back next winter 😊',
  TREE_TOO_BIG: 'You are too late! The tree is too big to fit in your house! 🏠',
  NOT_AVAILABLE: 'This size is not available in the assortment. 🤷',
  INVALID_SIZE: 'Invalid size format.',
  CONGRATS_MSG: 'Happy New Year!!!🎅\n\n',
};

//Regular expression accepts ordinary decimal numbers (positive or negative, integer or fractional),
//optionally surrounded by whitespace—but nothing else.
const NUMBER_REG_EXP = /^\s*-?\d+(\.\d+)?\s*$/;

module.exports = { MESSAGES, NUMBER_REG_EXP };
