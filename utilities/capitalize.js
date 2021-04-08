// Helper function to capitalize first character of a string.
const capitalize = (s) => {
  if (typeof s !== 'string') {
    return ''
  }
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
};

module.exports = capitalize;