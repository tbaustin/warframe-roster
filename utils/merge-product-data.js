'use strict'
const path = require('path')
const fs = require('fs-extra')
const glob = require('globby')
const dirs = [
	'./json/markdown/product',
	'./json/salsify'
]

function getJsonPaths(dirs){
	console.log('Getting product JSON paths...')
	let globStrs = dirs.map(dir => `${dir}/**/*.json`)
	return glob(globStrs)
}

function getData(paths){
	console.log('Getting product JSON data...')
	let promises = paths.map(path => fs.readJson(path))
	return Promise.all(promises)
		.then(data => {
			let obj = {}
			paths.map((p, key) => {
				obj[p] = data[key]
				obj[p].id = path.parse(p).name.toLowerCase()
			})
			return obj
		})
}

function mergeData(obj){
	console.log('Merging product JSON data...')
	let merged = {}
	for(let i in obj){
		let name = obj[i].id
		if (!(name in merged)){
			merged[name] = obj[i]
		}
		else{
			merged[name] = Object.assign(obj[i], merged[name])
		}
	}
	return merged
}

function saveJson(obj){
	console.log('Saving merged product JSON data...')
	let promises = []
	let all = []
	let ids = []
	for(let id in obj){
		all.push(obj[id])
		if(ids.indexOf(id) === -1){
			ids.push(id)
		}
		promises.push(fs.outputJson(`./json/product/${id}.json`, obj[id], { spaces: '\t' }))
	}
	promises.push(fs.outputJson(`./json/product-ids.json`, ids, { spaces: '\t' }))
	return Promise.all(promises)
}

getJsonPaths(dirs)
	.then(getData)
	.then(mergeData)
	.then(saveJson)
	.then(() => console.log('Product JSON merged!'))
	.catch(err => { throw err })