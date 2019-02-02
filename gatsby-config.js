const striptags = require(`striptags`)
const proxy = require(`http-proxy-middleware`)
const { readFileSync } = require(`fs-extra`)
const globby = require(`globby`).sync
const matter = require(`gray-matter`)
const { siteUrl } = require(`./site-config`)

// Get site info from markdown
const { siteTitle, siteDescription } = matter(
	readFileSync(`./src/markdown/settings/site.md`)
).data

// Get product IDs from markdown
const productMarkdown = globby(`./src/markdown/products/**/*.md`)
const productIds = []
productMarkdown.forEach(path => {
	const contents = readFileSync(path)
	const data = matter(contents).data
	productIds.push(data.id)
	if (Array.isArray(data.variants)) {
		data.variants.forEach(data => {
			if (data.id) {
				productIds.push(data.id)
			}
		})
	}
})

module.exports = {
	siteMetadata: {
		title: siteTitle,
		description: siteDescription,
		siteUrl,
	},
	plugins: [
		{
			resolve: `gatsby-plugin-emotion`,
			options: {
				hoist: true,
				sourceMap: true,
			},
		},
		`gatsby-plugin-sharp`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-remove-trailing-slashes`,
		`blog`,
		`generic-pages`,
		`products`,
		{
			resolve: `email-templates`,
			options: {
				siteUrl,
			},
		},
		{
			resolve: `gatsby-plugin-sitemap`,
			options: {
				exclude: [`/email-templates/*`],
			},
		},
		{
			resolve: `gatsby-plugin-robots-txt`,
			options: {
				policy: [
					{
						userAgent: `*`,
						disallow: [`/email-templates`],
					},
				],
			},
		},
		`gatsby-plugin-netlify`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/src/markdown`,
				name: `pages`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/static/uploads`,
				name: `uploads`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
					{
						resolve: `gatsby-remark-external-links`,
						options: {
							target: `_blank`,
						},
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 1200,
							linkImagesToOriginal: false,
							withWebp: {
								quality: 95,
							},
						},
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-netlify-cms`,
			options: {
				modulePath: `${__dirname}/src/components/cms/index.js`,
				enableIdentityWidget: false,
				manualInit: true,
			},
		},
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl,
			},
		},
		`cms-no-index`,
		// {
		// 	resolve: `webtasks`,
		// 	options: {
		// 		name: `gatsby-boilerplate-autodeploy`,
		// 		path: `src/webtasks/autodeploy.js`,
		// 		container: process.env.WEBTASKS_CONTAINER,
		// 		token: process.env.WEBTASKS_TOKEN,
		// 		cron: `0 0 * * *`,
		// 		secrets: {
		// 			BUILD_HOOK: process.env.BUILD_HOOK,
		// 		},
		// 		shouldDeploy: process.env.BRANCH === `master`,
		// 	},
		// },

		// Client plugins
		`route-delayed-animation`,
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-polyfill-io`,
		{
			resolve: `gatsby-plugin-favicon`,
			options: {
				logo: `./src/img/icon.png`,
				injectHTML: true,
				icons: {
					android: false,
					appleIcon: false,
					appleStartup: false,
					coast: false,
					favicons: true,
					firefox: false,
					twitter: false,
					yandex: false,
					windows: false,
				},
			},
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				trackingId: `UA-2411855-10`,
				anonymize: true,
				respectDNT: true,
			},
		},
		{
			resolve: `gatsby-plugin-prefetch-google-fonts`,
			options: {
				fonts: [
					{
						family: `Oswald`,
						subsets: [`latin`],
					},
					{
						family: `Open Sans`,
						subsets: [`latin`],
					},
				],
			},
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `{
					site{
						siteMetadata{
							title
							description
							siteUrl
							site_url: siteUrl
						}
					}
				}`,
				feeds: [
					{
						query: `{
							allMarkdownRemark(
								limit: 1000,
								sort: { order: DESC, fields: [frontmatter___date]},
								filter: {
									fileAbsolutePath: {
										regex: "/src/markdown/blog/"
									}
									frontmatter: {
										published: { eq: true }
									}
								}
							){
								edges{
									node{
										excerpt
										html
										fields{
											path
										}
										frontmatter{
											title
											date
										}
									}
								}
							}
						}`,
						serialize: ({
							query: {
								site: {
									siteMetadata: { siteUrl },
								},
								allMarkdownRemark: { edges },
							},
						}) => {
							return edges.map(
								({
									node: {
										html,
										frontmatter,
										fields: { path },
									},
								}) => {
									return {
										...frontmatter,
										url: `${siteUrl}${path}`,
										guid: `${siteUrl}${path}`,
										custom_elements: [{ "content:encoded": html }],
									}
								}
							)
						},
						output: `/rss.xml`,
					},
				],
			},
		},
		{
			resolve: `search`,
			options: {
				query: `{
					allMarkdownRemark(
						filter: {
							frontmatter: {
								published: { eq: true }
							}
						}
					) {
						edges {
							node {
								id
								html
								excerpt
								frontmatter {
									title
								}
								fields{
									path
								}
							}
						}
					}
				}`,
				parse: data => {
					data = data.allMarkdownRemark.edges
					data = data.filter(({ node }) => {
						if (node && node.fields && node.fields.path) {
							return true
						}
						return false
					})
					return data.map(
						({
							node: {
								id,
								html,
								excerpt,
								frontmatter: { title },
								fields: { path },
							},
						}) => {
							return {
								id,
								index: {
									body: striptags(html),
									title,
								},
								store: {
									title,
									excerpt,
									path,
								},
							}
						}
					)
				},
			},
		},
	],
	developMiddleware: app => {
		app.use(
			`/.netlify/functions/`,
			proxy({
				target: `http://localhost:9000`,
				pathRewrite: {
					"/.netlify/functions/": `/`,
				},
			})
		)
	},
}
