const path = require('path')
const glob = require('glob-promise')
const fs = require('fs-extra')

module.exports = {
	poweredByHeader: false,
	exportPathMap: () => {
		const pages = {}

		return Promise.resolve()

			// Home page
			.then(() => {
				pages['/'] = { page: '/' }
			})



			// Product pages
			.then(() => fs.readJson('./json/product/all.json'))
			.then(products => {
				for (let i in products) {
					const product = products[i]
					if (product.render === false) continue
					pages[`/product/${product.id}`] = {
						page: '/product',
						query: { id: product.id }
					}
				}
			})

			.then(() => pages)
			.catch(console.error)
	},
	webpack: (config, obj) => {
		config.module.rules.push(
			{
				test: /\.css$/,
				loader: 'emit-file-loader',
				options: {
					name: 'dist/[path][name].[ext]'
				}
			},
			{
				test: /\.css$/,
				use: [
					'babel-loader',
					'raw-loader',
					'postcss-loader'
				]
			}
		)
		return config
	}
}
