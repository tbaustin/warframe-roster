import ReactGA from 'react-ga'
import config from '../config/config'

export const initGA = () => {
	if (!config.analyticsId) return
	console.log('Google Analytics init')
	ReactGA.initialize(config.analyticsId)
}

export const logPageView = () => {
	if (!config.analyticsId) return
	console.log(`Logging pageview for ${window.location.pathname}`)
	ReactGA.set({ page: window.location.pathname })
	ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
	console.log('Logging event')
	if (!config.analyticsId) return
	if(category && action){
		ReactGA.event({ category, action })
	}
}

export const logException = (description = '', fatal = false) => {
	console.log('Logging exception')
	if (!config.analyticsId) return
	if (description) {
		ReactGA.exception({ description, fatal })
	}
}
