'use strict'
module.exports = function(query, opt){
	if(!opt) opt = {}

	var data
	try {
		data = require(`${process.cwd()}/json/markdown/posts/all.json`)
	}
	catch (e) {
		data = false
	}

	if (data === false) {
		try {
			data = require(`../json/markdown/posts/all.json`)
		}
		catch (e) {
			console.log(`json/markdown/posts/all.json not found`)
			data = []
		}
	}
	data = data.map(function(obj){
		return obj
	})

	var matches
	if(!query){
		matches = data.reverse()
	}
	else {
		// Find matches
		matches = []
		for (var i in data) {
			var post = data[i]
			var match = true
			for (var i in query) {
				if (query[i] !== post[i]) {
					match = false
					break
				}
			}
			if (match === true) {
				matches.push(post)
			}
		}
	}

	if (opt.orderBy) {
		matches.sort(sortMatches(opt.orderBy))
	}
	if(opt.offset){
		matches.splice(0, opt.offset)
	}
	if(opt.limit){
		matches.length = opt.limit
	}


	return matches

}

function sortMatches(str){
	return function (a, b) {
		if (a[str] < b[str]) {
			return -1
		}
		if (a[str] > b[str]) {
			return 1
		}
		return 0
	}
}