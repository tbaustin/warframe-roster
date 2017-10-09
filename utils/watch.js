'use strict'
const chokidar = require('chokidar')
const images = require('./images')
const cpy = require('cpy')

const watchSettings = {
	ignored: [ '**/.*' ],
	ignoreInitial: true
}
function watch(files, fn){
	chokidar.watch(typeof files === 'string' ? [ files ] : files, watchSettings)
		.on('add', fn)
		.on('change', fn)
}

// Watch images for changes
watch(`img/**/*`, path => {
	path = path.replace('img/', '')
	images(path)
})

watch(`fonts/**/*`, path => {
	path = path.replace('fonts/', '')
	cpy([path], 'static')
})
