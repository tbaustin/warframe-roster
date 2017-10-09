'use strict'
const salsifyQuery = require('./salsify-query')
let products
try {
	products = require(`${process.cwd()}/json/product/all.json`)
}
catch (e) {
	products = false
}

if (products === false) {
	try {
		products = require('../json/product/all.json')
	}
	catch (e) {
		console.error('json/product/all.json not found')
		products = []
	}
}

module.exports = function(query, opt){
	if(!opt) opt = {}

	// Find matches
	let matches = []
	for (let i in products){
		let product = products[i]
		let match = true
		for (let i in query){
			if(query[i] !== product[i]){
				match = false
				break
			}
		}
		if(match === true){
			matches.push(product)
		}
	}

	// Sort
	matches.sort(sortMatches(opt.sort || 'order'))

	// Remove deactivated product
	if(opt.renderedProduct !== false){
		matches = matches.filter(prod => {
			if(prod.render === false) return false
			return true
		})
	}

	// Remove duplicates
	if (opt.filter) {
		matches = filterMatches(matches, opt.filter)
	}

	// Single product
	if(opt.single){
		matches = matches.length ? matches[0] : {}
	}

	return matches
}

function filterMatches(matches, prop){
	let res = []
	let foundProps = []
	matches.forEach(match => {
		if(match[prop] && foundProps.indexOf(match[prop]) === -1){
			res.push(match)
			foundProps.push(match[prop])
		}
	})
	return res
}

function sortMatches(prop){
	return function (a, b) {
		if (a[prop] < b[prop]) {
			return -1
		}
		if (a[prop] > b[prop]) {
			return 1
		}
		return 0
	}
}