import { routerAdd } from 'utils/router-events'

let loadTimeout

export default function () {
	if(!window.routerTimeoutInit){
		console.log('Initiating router timeouts.')
		window.routerTimeoutInit = true
		routerAdd('onRouteChangeStart', routerStart)
		routerAdd('onRouteChangeComplete', clearLoadTimeout)
		routerAdd('onRouteChangeError', routerError)
	}
}

function routerStart(url){
	loadTimeout = setTimeout(() => routerError(null, url), 5000)
}

function routerError(err, url){
	document.location = url || '/404'
}

function clearLoadTimeout() {
	clearTimeout(loadTimeout)
}