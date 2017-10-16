'use strict'
const categories = require('../../config/product.config')
const variants = []
// Get all variants
for(let i in categories){
	const products = categories[i].product
	if(products){
		products.forEach(product => {
			if(typeof product === 'object'){
				product = product.map(id => id.toLowerCase())
				variants.push(product)
			}
		})
	}
}

function findVariants(id){
	id = id.toLowerCase()
	for(let i = variants.length; i--;){
		const set = variants[i]
		if(set.indexOf(id) > -1){
			const arr = []
			set.forEach(variantId => {
				if(variantId !== id){
					arr.push(variantId)
				}
			})
			return arr
		}
	}
	return false
}

module.exports = findVariants
