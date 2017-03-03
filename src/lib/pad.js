var left = function (amount, value) {
  return ' '.repeat(amount) + value
}

var top = function (amount, value) {
  return '\n'.repeat(amount) + value
}

var bottom = function (amount, value) {
  return value + '\n'.repeat(amount)
}

var vertical = function (amount, value) {
  return bottom(amount, top(amount, value))
}

module.exports = {
  left: left,
  top: top,
  bottom: bottom,
  vertical: vertical
}
