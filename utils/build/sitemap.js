'use strict'
const fs = require('fs-extra')
const Sitemap = require('sitemap')
const pkg = require('../../package.json')
const router = require('../../next.config').exportPathMap(true)

// Build sitemap from router
module.exports = () => new Promise((resolve, reject) => {
	if (process.env && process.env.URL) {
		console.log('Creating sitemap...')
		router.then(router => {
			const urls = []
			for (let i in router) {
				if (i === '/styleguide') continue
				urls.push({ url: i })
			}
			const sitemap = Sitemap.createSitemap({
				hostname: process.env.URL,
				urls: urls
			})
			sitemap.toXML((err, xml) => {
				if (err) return reject(err)
				fs.outputFile(`./dist/sitemap.xml`, xml)
					.then(() => {
						console.log('Sitemap built.')
						resolve()
					})
					.catch(reject)
			})
		})
	}
	else {
		console.log('Sitemap not generated. process.env.URL not found.')
		resolve()
	}
})