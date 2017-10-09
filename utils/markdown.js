'use strict'
const markdown = require('markdown-to-json-files')
markdown('./', `markdown`, './json/markdown')
	.then(() => console.log('Output markdown to JSON.'))
	.catch(console.error)
