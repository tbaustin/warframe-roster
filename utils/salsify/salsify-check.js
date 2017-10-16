'use strict'
const checkProperty = 'images'
const product = require('../../json/product/all.json')
console.log('\n\nMissing Salsify content...')
product.forEach(prod => {
	if(prod[checkProperty].length === 0){
		console.log(`${prod.id.toUpperCase()}: ${prod.title}`)
	}
})