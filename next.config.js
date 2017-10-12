const fs = require('fs-extra')
const glob = require('globby')
const path = require('path')

module.exports = {
	poweredByHeader: false,
	exportPathMap: () => {
		const pages = {}

		return Promise.resolve()

			// Home page
			.then(() => {
				pages['/'] = { page: '/' }
			})

			// Product & category pages
			.then(() => fs.readJson('./json/product/all.json'))
			.then(products => {
				for (let i in products) {
					const product = products[i]
					if (product.render === false) continue

					// Category
					let categoryPath = `/category/${product.category}`
					if (!pages[categoryPath]) {
						pages[categoryPath] = {
							page: '/category',
							query: { id: product.category }
						}
					}

					// Product
					pages[`/product/${product.id}`] = {
						page: '/product',
						query: { id: product.id }
					}

				}
				return products
			})



			// Markdown pages
			.then(() => glob(['./json/markdown/pages/*.json']))
			.then(markdown => {
				markdown.forEach(file => {
					const obj = require(file)
					const id = path.parse(file).name
					let permalink = obj.permalink || `/${id}`
					if (permalink[0] !== '/') {
						permalink = `/${permalink}`
					}
					pages[permalink] = {
						page: `/${obj.template}` || '/page',
						query: {
							id: id
						}
					}
					console.log(pages)
				})
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
