'use strict'
require('dotenv').config({ silent: true })
const query = require('./salsify-query')
const getIds = require('../product/get-ids')
const config = require('../../config/salsify.js')
const fs = require('fs-extra')

// Fetch product from Salsify
console.log('Fetching product from Salsify...')
let ids

// Get all product IDs
getIds(true)

	// Get data from Salsify
	.then(res => {
		ids = res
		return query(ids, config)
	})

	// Output to JSON files
	.then(data => {
		console.log('Outputting Salsify data to JSON files...')
		const promises = data.map((contents, key) => {
			const id = ids[key].toLowerCase()
			return fs.outputJson(`./json/salsify/${id}.json`,contents, {
				spaces: '\t'
			})
		})
		return Promise.all(promises)
	})

	.then(() => console.log('Salsify data saved!'))
	.catch(err => { throw err })
