'use strict'
module.exports = {
	price: {
		property: 'MSRP',
		filter: str => {
			if(typeof str === 'number') return str
			if (str){
				try {
					str = str.trim()
					str = str.replace('$', '')
					str = Number(str)
				}
				catch(e){ return false }
				return str
			}
			return false
		}
	},

	// Images
	images: {
		property: 'Web Images',
		type: 'media'
	}
}