'use strict'
const fetch = require('isomorphic-fetch')
const cache = {}
const endpoint = 'https://ynwagjvee2.execute-api.us-east-1.amazonaws.com/production/handler'


function fetchData(id) {
	console.log(`Fetching ${id} from Salsify...`)
	return fetch(`${endpoint}?id=${id.toUpperCase()}`)
}

function mutateData(obj, schema) {
	//console.log('Mutating Salsify data...')
	const res = {}
	for (let i in schema) {
		if (typeof schema[i] === 'string') {
			res[i] = obj[schema[i]]
		}
		// Assets
		else if (schema[i].type === 'media') {
			res[i] = obj[schema[i].property]
			if (typeof res[i] === 'string') res[i] = [res[i]]
			if (res[i]) {
				res[i] = res[i].map(id => findAsset(obj, id))
			}
			else {
				res[i] = []
			}
		}
		else if(schema[i].filter){
			res[i] = schema[i].filter(obj[schema[i].property])
		}
		else {
			res[i] = obj[schema[i].property]
		}
	}
	return res
}

function findAsset(obj, id) {
	if(!obj.salsify_digital_assets) obj.salsify_digital_assets = []
	for (let i = obj['salsify:digital_assets'].length; i--;) {
		const asset = obj['salsify:digital_assets'][i]
		if (asset['salsify:id'] === id) {
			let url = asset['salsify:url'].split('/')
			url[0] = 'https:'
			url = url.join('/')
			return url
		}
	}
}


module.exports = (ids, schema) => {
	let single = false
	if(typeof ids === 'string'){
		ids = [ids]
		single = true
	}
	let notFound = 0
	const promises = ids.map(id => {
		if (cache[id]) {
			return mutateData(cache[id], schema)
		}
		return fetchData(id)
			.then(res => {
				if(res.status === 200){
					return res.json()
				}
				else {
					notFound++
					console.log(`No results found at ${endpoint}?id=${id.toUpperCase()}`)
					return {}
				}
			})
			.then(res => {
				console.log(`Fetched Salsify results for ${id}...`)
				cache[id] = Object.assign({}, res)
				return res
			})
			.then(obj => mutateData(obj, schema))
	})

	return Promise.all(promises)
		.then(res => {
			if(single) return res[0]
			console.log(`${notFound} products not found in Salsify`)
			return res
		})
		.catch(err => {
			throw err
		})
}