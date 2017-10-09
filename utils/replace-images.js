'use strict'
const glob = require('globby')
const fs = require('fs-extra')
const transform = require('./transform-image')

let paths
let contents
let regLinks = /\/static\/(.*?)('|"|\)| )/gi
let regRemove = /('|"|\)| )/g

glob([
		'dist/**/*.js',
		'dist/**/*.css',
		'dist/**/*.html'
	])

	// Get file data
	.then(res => {
		paths = res
		return Promise.all(paths.map(path => fs.readFile(path, 'utf-8')))
	})

	// Extract image URLs
	.then(res => {
		contents = res
		let found = []
		contents.forEach(str => {
			let matches = str.match(regLinks) || []
			matches = matches.forEach(match => {
				match = match.replace(regRemove, '')
				if(found.indexOf(match) === -1){
					found.push(match)
				}
			})
		})
		return found
	})

	// Image operations
	.then(paths => {
		let dir = __dirname.split('/')
		dir.pop()
		dir = dir.join('/')
		let promises = paths.map(path => {
			return transform(path, {
				cwd: dir,
				dist: true
			})
		})
		return Promise.all(promises)
	})

	.then(console.log)
	.catch(err => {throw err})