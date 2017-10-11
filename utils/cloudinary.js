'use strict'
module.exports = (url, ...args) => {
	url = url.split('/')
	let name = url.pop()
	url.push(...args)
	return `${url.join('/')}/${name}`
}