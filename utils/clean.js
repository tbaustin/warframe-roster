'use strict'
const fs = require('fs-extra')
console.log('Cleaning JSON directory...')
fs.remove('json')
	.then(() => console.log('Cleaned JSON directory.'))
	.catch(err => {
		throw new Error(err)
	})
