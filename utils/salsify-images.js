'use strict'
require('dotenv').config({ silent: true })
const glob = require('glob-promise')
const fs = require('fs-extra')
const getUrls = require('get-urls')
const replaceInFile = require('replace-in-file')
const fetch = require('isomorphic-fetch')

const localPath = `image/upload`
const serverPath = `${process.env.URL}/${localPath}`

const salsifyDomain = 'https://images.salsify.com'
const failed = []

if (process.env.URL) {
	console.log('Parsing files for Salsify assets...')

	let htmlPaths
	glob('dist/**/*.html')

		// Read .html files
		.then(paths => {
			htmlPaths = paths
			return Promise.all(paths.map(path => {
				return fs.readFile(path, 'utf8')
			}))
		})

		// Parse URLs
		.then(contents => {
			console.log('Read files...')
			const urls = []
			contents.forEach(str => {
				const foundUrls = getUrls(str)
				foundUrls.forEach(url => {
					if (urls.indexOf(url) === -1 && url.indexOf(salsifyDomain) === 0) {
						let path = url.replace(salsifyDomain, '')
						path = `dist${path}`
						urls.push({
							url: url,
							path: path
						})
					}
				})
			})
			return urls
		})

		// Download files
		.then(downloadFiles)
		.then(() => {
			console.log('Retrying failed connections...')
			return downloadFiles(failed)
		})

		.then(() => console.log('Done!'))
		.catch(err => { throw err })
}
else{
	console.log('No process.env.URL found')
}


function downloadFiles(urls) {
	console.log('Downloading files...')
	const total = urls.length
	let progress = 0
	let p = Promise.resolve()

	urls.forEach(url => {
		p = p.then(() => new Promise((resolve, reject) => {
			console.log(`Downloading ${url.url}...`)
			fetch(url.url)
				.then(res => res.buffer())
				.then(data => fs.outputFile(url.path, data))
				.then(() => {
					progress++
					console.log(`(${progress}/${total}) Downloaded ${url.url}.`)
					resolve()
				})
				.catch(err => {
					console.log(`(${progress}/${total}) Error on ${url.url}.`)
					console.error(err)
					failed.push(url)
					resolve()
				})

		}))
	})
	return p
}
