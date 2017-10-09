'use strict'
module.exports = id => {
	let product
	try{
		product = require(`${process.cwd()}/json/product/${id}.json`)
	}
	catch(e){
		product = false
	}

	if(product === false){
		try{
			product = require(`../../json/product/${id}.json`)
		}
		catch(e){
			console.log(`json/product/${id}.json not found`)
			product = {}
		}
	}
	return product
}
