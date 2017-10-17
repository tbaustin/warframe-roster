'use strict'
require('dotenv').config({ silent: true })
const clean = require('./clean')
const markdown = require('../markdown/markdown')
const markdownModules = require('../markdown/markdown-modules')
const salsify = require('../salsify/salsify')
const mergeProduct = require('../product/merge-product-data')
const allJson = require('./all-json')
const env = require('./env')

// Sync data
module.exports = () => clean()
	.then(() => Promise.all([
		markdown(),
		markdownModules('privacy-policy'),
		markdownModules('terms-of-service'),
		salsify(),
		env()
	]))
	.then(() => mergeProduct())
	.then(() => allJson())