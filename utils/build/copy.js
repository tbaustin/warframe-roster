'use strict'
const cpy = require('cpy')

const promises = [
	cpy([ 'config/_redirects' ], 'dist'),
	cpy([ 'admin/**/*' ], 'dist/admin'),
	cpy([ 'uploads/**/*' ], 'dist/uploads')
]

Promise.all(promises)
	.then(() => console.log('Files copied.'))
	.catch(console.error)
