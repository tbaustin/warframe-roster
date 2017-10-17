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


// Prepare for build
clean()
	.then(() => Promise.all([
		markdown(),
		markdownModules('privacy-policy'),
		markdownModules('terms-of-service'),
		salsify()
	]))
	.then(() => mergeProduct())
	.then(() => Promise.all([
		allJson(),
		env()
	]))
	.then(() => exec('next build'))
	.then(() => exec('next export -o dist'))
	.then(() => Promise.all([
		sitemap(),
		copy(),
		exec('html-minifier --input-dir ./dist --output-dir ./dist --file-ext html --config-file ./config/.htmlmin')
	]))

	.then(() => console.log('Done building!'))
	.catch(err => { throw err })