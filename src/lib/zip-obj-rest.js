const zipObjRest = function (keys, values) {
  return values.reduce(function (result, v, idx) {
    let key = keys[idx]
    if (idx === keys.length - 1) {
      result[key] = [ v ]
    } else if (key) {
      result[key] = v
    } else {
      key = keys[keys.length - 1]
      if (key) {
        result[key].push(v)
      }
    }
    return result
  }, {})
}

module.exports = zipObjRest
