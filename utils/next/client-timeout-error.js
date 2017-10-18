import { routerAdd } from 'utils/next/router-events'
import env from 'json/env'

let loadTimeout

export default function () {
	if(!window.routerTimeoutInit){
		window.routerTimeoutInit = true
		if (env.NODE_ENV !== 'production') {
			routerAdd('onRouteChangeStart', routerStart)
			routerAdd('onRouteChangeComplete', clearLoadTimeout)
			routerAdd('onRouteChangeError', routerError)
		}
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