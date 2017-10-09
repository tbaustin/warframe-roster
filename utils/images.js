'use strict'
require('dotenv').config({ silent: true })
const fs = require('fs-extra')
const path = require('path')
const glob = require('glob-all')
const sharp = require('sharp')
const minimatch = require('minimatch')
const config = require('../config/image.config')

function processImage(src, opt){
	return new Promise((resolve, reject) => {
		// Get new name
		let out = `static/img/${src}`
		out = path.parse(out)
		delete out.base
		if(opt.suffix){
			out.name += opt.suffix
		}
		else if(opt.prefix){
			out.name = opt.prefix + out.name
		}
		out = path.format(out)
		console.log(`Processing ${out}...`)
		fs.ensureFile(out)
			.then(() => {
				let proc = sharp(`img/${src}`)
				proc = opt.process(proc)
				proc.toFile(out, err => {
					if(err) reject(err)
					else{
						console.log(`Saved ${out}.`)
						resolve()
					}
				})
			})
	})
}

function copyImage(src){
	return new Promise((resolve, reject) => {
		const out = `static/img/${src}`
		console.log(`Copying ${out}...`)
		fs.copy(`img/${src}`, out)
			.then(resolve)
			.catch(reject)
	})
}

function getAllImages(imgs){
	if(imgs){
		if(typeof imgs === 'string'){
			imgs = [ imgs ]
		}
		return Promise.resolve(imgs)
	}
	return new Promise((resolve, reject) => {
		return glob([ '**/*', '!**/.*', '!**/*.json' ], { cwd: 'img' }, (err, files) => {
			if(err) reject(err)
			else resolve(files)
		})
	})
}


module.exports = (imgs) => {

	console.log('Processing images...')

	getAllImages(imgs)
		.then(imgs => {
			const promises = []
			const processed = []
			for(let i in imgs){
				const file = imgs[i]
				let foundMatch = false
				for(let i in config){
					const opts = config[i]
					if(!Array.isArray(opts)) opts = [ opts ]
					if(minimatch(file, i)){
						opts.forEach(opt => {
							promises.push(processImage(file, opt))
						})
						foundMatch = true
					}
				}
				if(!foundMatch){
					promises.push(copyImage(file))
				}
			}
			Promise.all(promises)
				.then(() => console.log('Done!'))
				.catch(err => {
					throw new Error(err)
				})
		})
		.catch(console.error)

}
