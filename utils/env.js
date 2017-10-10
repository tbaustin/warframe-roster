'use strict'
require('dotenv').config({ silent: true })
const fs = require('fs-extra')
const expose = require('../config/expose-env')

// Get env variables
let clientObj = {}
expose.forEach(key => {
	if(process.env[key]){
		clientObj[key] = process.env[key]
	}
})

// Save file
console.log('Saving client .env variables...')
fs.outputJson('./config/env.json', clientObj)
	.then(() => console.log('Done saving client .env variables!'))
	.catch(err => {
		throw err
	})