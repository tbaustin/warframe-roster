'use strict'
require('dotenv').config({ silent: true })
const sync = require('./sync')
const exec = require('child-process-promise').exec
const sitemap = require('./sitemap')
const copy = require('./copy')
const replaceImages = require('../images/replace-images')

// Sync data from APIs & new files
sync()

	// Build
	.then(() => {
		console.log('Building Next.js app...')
		return exec('next build')
	})
	.then(() => {
		console.log('Exporting Next.js static files...')
		return exec('next export -o dist')
	})

	// Post build
	.then(() => Promise.all([
		replaceImages(),
		sitemap(),
		copy(),
		exec('html-minifier --input-dir ./dist --output-dir ./dist --file-ext html --config-file ./config/.htmlmin')
	]))

	.then(() => console.log('Done building!'))
	.catch(err => { throw err })