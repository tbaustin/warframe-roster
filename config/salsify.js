// http://cloudinary.com/documentation/image_transformations

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
	thumbnails: {
		property: 'Web Images',
		transformations: [
			'w_200'
		]
	},
	medium: {
		property: 'Web Images',
		transformations: [
			'h_500'
		]
	},
	images: {
		property: 'Web Images',
		transformations: [
			'h_950',
			//'e_shadow:90,x_15,y_15'
		]
	}
}