var toArrayAssignKeys = function (toProp, object) {
  return Object.keys(object).map(function (k) {
    var value = object[k]
    var newObject = Object.assign({}, value)
    newObject[toProp] = k
    return newObject
  })
}

module.exports = toArrayAssignKeys
