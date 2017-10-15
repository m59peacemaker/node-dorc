const options = {
  dry: {
    type: 'boolean',
    description: 'print only dry run'
  },
  detach: {
    type: 'boolean',
    description: "don't follow service output",
    alias: [ 'd' ]
  }
}

module.exports = options
