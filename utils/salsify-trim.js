'use strict'
require('dotenv').config({ silent: true })
const glob = require('globby')
const fs = require('fs-extra')
const properties = require('../config/salsify-properties')

console.log('Trimming Salsify files...')
// Fetch product from Salsify
glob('./json/salsify/*.json')
	.then(paths => {
		return Promise.all(paths.map(path => {
				return require(`.${path}`)
			}))
			.then(files => {
				const obj = {}
				paths.forEach((path, key) => {
					obj[path] = files[key]
				})
				return obj
			})
	})
	.then(files => {
		for (let i in files) {
			const file = files[i]
			for (let i in file) {
				if (properties.indexOf(i) === -1) {
					delete file[i]
				}
			}
		}
		return files
	})
	.then(files => {
		const promises = []
		for(let i in files){
			promises.push(fs.outputJson(i, files[i], {
				spaces: '\t'
			}))
		}
		return Promise.all(promises)
	})
	.then(() => console.log('Done trimming Salsify files.'))
	.catch(err => {
		throw console.error(err)
	})
