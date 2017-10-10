'use strict'
const chokidar = require('chokidar')
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

watch(`fonts/**/*`, path => {
	path = path.replace('fonts/', '')
	cpy([path], 'static')
})
