#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const getRunOptions = require('~/lib/get-docker-run-options')

fs.writeFileSync(
  path.join(__dirname, '../../src/handle/run/docker-run-options.json'),
  JSON.stringify(getRunOptions(), null, 2)
)
