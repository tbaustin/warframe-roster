'use strict'
const fs = require('fs-extra')
const expose = require('../../config/expose-env')

module.exports = () => {
	console.log('Exposing .env variables...')
	// Get env variables
	let clientObj = {}
	expose.forEach(key => {
		if (process.env[key]) {
			clientObj[key] = process.env[key]
		}
	})

	// Save file
	return fs.outputJson('./json/env.json', clientObj)
		.then(() => console.log('Done saving client .env variables!'))
}
