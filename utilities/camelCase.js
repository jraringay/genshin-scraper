const capitalize = require("./capitalize");

// Helper function to turn string format into camel case.
const camelCase = (text) => {
  if (typeof text !== 'string') {
    return ''
  }
  let first = true;
  return text.split(' ')
  .map((val) => {
    if (first) {
      first = false;
      return val.toLowerCase()
    }
    return capitalize(val)
  })
  .join('');
}

module.exports = camelCase;