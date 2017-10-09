const path = require('path')
const glob = require('glob-promise')
const fs = require('fs-extra')

module.exports = {
	port: 3000,
	poweredByHeader: false,
	exportPathMap: () => {
		return new Promise((resolve, reject) => {
			const pages = {}

			Promise.resolve()

				.then(() => {
					resolve(Object.assign({
						'/': { page: '/' }
					}, pages))
				})
				.catch(console.error)
		})
	},
	webpack: (config, obj) => {
		config.module.rules.push(
			{
				test: /\.(css|scss)/,
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
		//config.plugins.push(new OpenBrowserPlugin({ url: 'http://localhost:3000/' }))
		return config
	}
}
