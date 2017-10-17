'use strict'
const matter = require('gray-matter')
const marked = require('marked')
const fs = require('fs-extra')

module.exports = mod => {
	const pkg = require(`../../node_modules/${mod}/package.json`)
	const path = `./node_modules/${mod}/${pkg.main}`
	const out = `./json/markdown/pages/${mod}.json`
	console.log(`Reading ${path}...`)
	fs.readFile(path)
		.then(contents => {
			const obj = matter(contents.toString())
			obj.data.contents = marked(obj.content)
			const data = obj.data
			console.log(`Writing ${out}...`)
			return data
		})
		.then(data => fs.outputJson(`./json/markdown/pages/${mod}.json`, data))
		.then(() => console.log(`Done writing ${out}.`))
}
