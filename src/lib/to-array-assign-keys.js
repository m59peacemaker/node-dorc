const toArrayAssignKeys = function (toProp, object) {
  return Object.keys(object).map(function (k) {
    const value = object[k]
    const newObject = Object.assign({}, value)
    newObject[toProp] = k
    return newObject
  })
}

module.exports = toArrayAssignKeys
