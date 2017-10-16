import Router from 'next/router'
const events = {}

export function routerAdd(prop, fn){
	// Create event if doesn't exist
	if(!events[prop]){
		events[prop] = []
		Router[prop] = () => {
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

const onceEvents = {}
export function routerOnce(prop, fn) {
	// Create event if doesn't exist
	if (!onceEvents[prop]) {
		onceEvents[prop] = []
		Router[prop] = () => {
			onceEvents[prop].forEach(event => {
				event(...arguments)
			})
			onceEvents[prop].length = 0
		}
	}
	// Add event
	onceEvents[prop].push(fn)
}