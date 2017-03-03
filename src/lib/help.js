const {curry, flip, pipe, map, pick, values} = require('ramda')
const columnify = curry(flip(require('columnify')))
const columns = columnify({showHeaders: false})
const prefixLines = curry(require('~/lib/prefix-lines'))
const toArrayAssignKeys = curry(require('~/lib/to-array-assign-keys'))

const prepareArgKeys = option => {
  let keys = ''
  if (option.aliases) {
    keys += option.aliases.map(v => '-' + v) + ', '
  }
  keys += '--' + option.name
  return keys
}

const Help = (usage, options, commands) => {
  const sections = [['Usage: ' + usage]]
  sections.push([
    'Commands:',
    pipe(
      values,
      map(pick(['usage', 'description'])),
      columns,
      prefixLines('  ')
    )(commands)
  ])
  sections.push([
    'Options:',
    pipe(
      curry(toArrayAssignKeys)('name'),
      map(o => ({
        keys: prepareArgKeys(o),
        description: o.description,
        type: `[${o.type}]`
      })),
      columns,
      prefixLines('  ')
    )(options)
  ])
  return sections
    .map(section => section.join('\n'))
    .join('\n\n')
}

module.exports = Help
