import ReactGA from 'react-ga'
import env from 'config/env.json'

export const initGA = () => {
	if (!env.GOOGLE_ANALYTICS_ID) return
	console.log('Google Analytics init')
	ReactGA.initialize(env.GOOGLE_ANALYTICS_ID)
}

export const logPageView = () => {
	if (!env.GOOGLE_ANALYTICS_ID) return
	console.log(`Logging pageview for ${window.location.pathname}`)
	ReactGA.set({ page: window.location.pathname })
	ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
	console.log('Logging event')
	if (!env.GOOGLE_ANALYTICS_ID) return
	if(category && action){
		ReactGA.event({ category, action })
	}
}

export const logException = (description = '', fatal = false) => {
	console.log('Logging exception')
	if (!env.GOOGLE_ANALYTICS_ID) return
	if (description) {
		ReactGA.exception({ description, fatal })
	}
}
