const { spawn } = require('child_process')
const R = require('ramda')
const format = require('chalk')
const prefixLines = require('prefix-stream-lines')

const runHook = (hook, hookName, serviceName) => new Promise((resolve, reject) => {
  // const cmdParts = hook.split(' ')
  ;[
    R.pipe(
      R.always(serviceName),
      R.ifElse(
        R.isNil,
        R.always(hookName + ':'),
        R.always(`Service: ${serviceName} - ${hookName}:`)
      ),
      format.cyan.dim.bold
    )(),
    `  > ${hook}`
  ].forEach(_ => console.log(_))
  const p = spawn('/bin/sh', [ '-c', hook ])
    .on('close', exitCode => exitCode ? reject(new Error(`hook "${hookName}" failed`)) : resolve())
  p.stdout
    .pipe(prefixLines(' '.repeat(4)))
    .pipe(process.stdout)
  p.stderr
    .pipe(prefixLines(' '.repeat(4)))
    .pipe(process.stderr)
})

module.exports = runHook
