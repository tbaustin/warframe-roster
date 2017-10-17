'use strict'
require('dotenv').config({ silent: true })
const clean = require('./clean')
const markdown = require('../markdown/markdown')
const markdownModules = require('../markdown/markdown-modules')
const salsify = require('../salsify/salsify')
const mergeProduct = require('../product/merge-product-data')
const allJson = require('./all-json')
const env = require('./env')
const exec = require('child-process-promise').exec
const sitemap = require('./sitemap')
const copy = require('./copy')
const replaceImages = require('../images/replace-images')

// Prebuild
clean()
	.then(() => Promise.all([
		markdown(),
		markdownModules('privacy-policy'),
		markdownModules('terms-of-service'),
		salsify(),
		env()
	]))
	.then(() => mergeProduct())
	.then(() => allJson())

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