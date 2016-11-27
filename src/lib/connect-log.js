const {spawn} = require('child_process')
const prefixLines = require('prefix-stream-lines')
const format = require('chalk')
const colors = ['cyan', 'yellow', 'green', 'magenta', 'blue']
function Next (array) {
  let index = -1
  return function () {
    index = index >= array.length -1 ? 0 : index + 1
    return array[index]
  }
}
const nextColor = Next(colors)

const connect = (name) => {
  console.log(name)
  const color = nextColor()
  const p = spawn('docker', ['logs', '--follow', name])
  p.stdout
    .pipe(prefixLines(`${format[color](name)} | `))
    .pipe(process.stdout)
  p.stderr
    .pipe(prefixLines(`${format[color](name)} | `))
    .pipe(process.stderr)
}

module.exports = connect
