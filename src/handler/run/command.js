// const R = require('ramda')
// const parse = require('minimist')
// const zipObjRest = R.curry(require('~/lib/zip-obj-rest'))

const dryOption = {
  dry: {
    type: 'boolean',
    description: 'print only dry run'
  }
}

const command = {
  usage: 'run [options...] <service> [cmd...]',
  description: 'run service (also accepts all docker run options)',
  options: {
    ...dryOption
  },
  parse: (args, options) => {
    throw (JSON.stringify(args))
    /* return R.over( */
    /*   R.lensProp('sub'), */
    /*   R.pipe( */
    /*     parse, */
    /*     R.converge( */
    /*       R.apply(R.mergeAll), */
    /*       [ */
    /*         R.lensProp('_', zipObjRest([ 'service', 'cmd' ])), */
    /*         v => { options: R.omit('_', v) } */
    /*       ] */
    /*     ) */
    /*   ) */
    /* // R.merge(zipObjRest(['service', 'cmd'], args)) */
    /* )(args) */
  }
}

module.exports = command
