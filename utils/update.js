'use strict'
const exec = require('child-process-promise').exec
const fs = require('fs-extra')
const cpy = require('cpy')

console.log('Updating boilerplate...')
fs.remove('temp-update')
	.then(() => {
		console.log('Cloning most recent boilerplate...')
		return exec('git clone git@github.com:escaladesports/boilerplate.git --depth 1 temp-update')
	})
	.then(() => {
		console.log('Copying relevant boilerplate files...')
		return cpy([
			'admin/index.html',
			'config/.htmlmin',
			'config/babel-preset.js',
			'utils/**/*',
			'.babelrc',
			'.nvmrc',
			'next.config.js',
			'postcss.config.js',
			'server.js',
			'README.md'
		], '../', {
			cwd: 'temp-update',
			parents: true
		})
	})
	.then(() => {
		console.log('Removing temporary files...')
		//return fs.remove('temp-update')
	})
	.then(() => console.log('Done updating boilerplate.'))
	.catch(err => { throw err })