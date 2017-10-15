const left = function (amount, value) {
  return ' '.repeat(amount) + value
}

const top = function (amount, value) {
  return '\n'.repeat(amount) + value
}

const bottom = function (amount, value) {
  return value + '\n'.repeat(amount)
}

const vertical = function (amount, value) {
  return bottom(amount, top(amount, value))
}

module.exports = {
  left: left,
  top: top,
  bottom: bottom,
  vertical: vertical
}
