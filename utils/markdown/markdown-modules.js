'use strict'
const argv = require('minimist')(process.argv.slice(2))
const matter = require('gray-matter')
const marked = require('marked')
const fs = require('fs-extra')
const pkg = require(`../../node_modules/${argv.m}/package.json`)

const path = `./node_modules/${argv.m}/${pkg.main}`
const out = `./json/markdown/pages/${argv.m}.json`
console.log(`Reading: ${path}`)

fs.readFile(path)
	.then(contents => {
		const obj = matter(contents.toString())
		obj.data.contents = marked(obj.content)
		const data = obj.data
		console.log(`Writing: ${out}`)
		return data
	})
	.then(data => fs.outputJson(`./json/markdown/pages/${argv.m}.json`, data))
	.catch(console.error)
