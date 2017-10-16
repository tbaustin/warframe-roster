'use strict'
const frontMatter = require('front-matter')
const yamlConverter = require('json2yaml')
const glob = require('globby')
const fs = require('fs-extra')

function findAllMarkdown(){
	return glob('markdown/product/**/*.md')
}
function convertMarkdown(files){
	const obj = {}
	const promises = files.map(file => {
		return fs.readFile(file, 'utf8')
			.then(contents => {
				return frontMatter(contents)
			})
	})
	return Promise.all(promises)
		.then(objs => {
			objs.forEach((contents, key) => {
				obj[files[key]] = contents
			})
			return obj
		})
}
function queryProduct(obj, query){
	let matches = {}
	for(let i in obj){
		let prod = obj[i].attributes
		let isMatch = true
		for(let i in query){
			if(prod[i] != query[i]){
				isMatch = false
				break
			}
		}
		if(isMatch){
			matches[i] = obj[i]
		}
	}
	return matches
}
function addData(obj, add){
	for(let i in obj){
		const attr = obj[i].attributes
		for(let i in add){
			attr[i] = add[i]
		}
	}
	return obj
}
// Convert back to yaml/markdown
function saveFiles(obj){
	const promises = []
	for(let i in obj){
		let yml = yamlConverter.stringify(obj[i].attributes)
		yml = yml.replace(/\n  /g, '\n')
		obj[i] = `${yml}---\n${obj[i].body}`
		promises.push(fs.outputFile(i, obj[i]))
	}
	console.log(`Updating ${promises.length} files...`)
	return Promise.all(promises)
}


function addFrontMatter(query, add){
	return findAllMarkdown()
		.then(convertMarkdown)
		.then(obj => queryProduct(obj, query))
		.then(obj => addData(obj, add))
		.then(obj => saveFiles(obj))
		.catch(err => {throw err})
}


function createFrontMatter(path, general, products){
	let promises = []
	// Merge general data in products
	for(let i in products){
		let other = Object.assign({}, general)
		let product = products[i]
		let newProduct = {
			contents: other.contents
		}
		delete other.contents
		newProduct.attributes = Object.assign({}, other, product)
		let yml = yamlConverter.stringify(newProduct.attributes)
		yml = yml.replace(/\n  /g, '\n')
		let str = `${yml}---\n\n${newProduct.contents}`

		promises.push(new Promise((resolve, reject) => {
			fs.outputFile(`${path}/${i}.md`, str)
		}))
	}
	return Promise.all(promises)
}



addFrontMatter({
	title: 'Static K-4'
}, {
	price: 599.99
})