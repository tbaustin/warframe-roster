'use strict'
const fs = require('fs-extra')
module.exports = () => {
	console.log('Cleaning JSON directory...')
	return fs.remove('json')
		.then(() => console.log('Cleaned JSON directory.'))
}