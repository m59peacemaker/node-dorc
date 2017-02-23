const format = require('chalk')
const split = require('split')
const prefixLines = require('prefix-stream-lines')
const through = require('throo')

const chalkStream = (c) => {
  return through((push, chunk, enc, cb) => {
    push(format[c](chunk) + '\n')
    cb()
  })
}

const Stream = (name, color, to) => {
  const s = through()
  s
    .pipe(split())
    .pipe(chalkStream(color))
    .pipe(prefixLines(`${name} | `))
    .pipe(to)
  return s
}

const Display = name => {
  const distinctStream = Stream(name, 'cyan', process.stdout)
  const infoStream = Stream(name, 'yellow', process.stdout)
  const errStream = Stream(name, 'red', process.stderr)
  const distinct = d => distinctStream.write(format.cyan.dim.bold(d) + '\n')
  const info = d => infoStream.write(d + '\n')
  const err = d => errStream.write(d + '\n')
  return {
    distinct,
    info,
    err
  }
}

Display.Stream = Stream

module.exports = Display
