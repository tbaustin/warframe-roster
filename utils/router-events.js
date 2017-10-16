import Router from 'next/router'
const events = {}

export function routerAdd(prop, fn){
	// Create event if doesn't exist
	if(!events[prop]){
		events[prop] = []
		Router[prop] = function(){
			events[prop].forEach(event => {
				event(...arguments)
			})
		}
	}
	// Add event
	events[prop].push(fn)
}

export function routerRemove(prop, fn){
	let i = events[prop].indexOf(fn)
	if(i > -1){
		events[prop].splice(i, 1)
	}
}