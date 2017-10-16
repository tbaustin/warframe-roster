import React from 'react'
import { routerAdd, routerRemove } from 'utils/router-events'
import { initGA, logPageView } from 'utils/analytics'
import style from 'components/_global-styles.css'
import fastclick from 'react-fastclick'
import PageLoadBar from 'components/page-load-animation'
import Head from 'next/head'
import env from 'json/env.json'
import createTitle from 'utils/create-page-title'
import createDescription from 'utils/create-page-description'

fastclick()

export default class Layout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false
		}
		this.routerStart = this.routerStart.bind(this)
		this.routerDone = this.routerDone.bind(this)
		this.routerError = this.routerError.bind(this)
		this.clearTimeouts = this.clearTimeouts.bind(this)
	}
	componentWillMount() {
		// Progress bar
		this.clearTimeouts()
		routerAdd('onRouteChangeStart', this.routerStart)
		routerAdd('onRouteChangeComplete', this.routerDone)
		routerAdd('onRouteChangeError', this.routerError)
	}
	componentDidMount() {
		// Google Analytics
		if (!window.GA_INITIALIZED) {
			initGA()
			window.GA_INITIALIZED = true
			logPageView()
		}

		// Zygote
		if ('zygote' in window) {
			zygote.findButtons()
			zygote.findQty()
			zygote.findIcons()
			if (!zygote.api) {
				zygote.api = env.ZYGOTE_API
				zygote.properties = {
					site: env.ECOMMERCE_API_SITE
				}
			}
		}
	}
	componentWillUnmount() {
		this.clearTimeouts()
		routerRemove('onRouteChangeStart', this.routerStart)
		routerRemove('onRouteChangeComplete', this.routerDone)
		routerRemove('onRouteChangeError', this.routerError)
	}
	routerStart(url) {
		this.clearTimeouts()
		this.loadTimeout = setTimeout(() => this.routerError(null, url), 5000)
	}
	clearTimeouts() {
		clearTimeout(this.loadTimeout)
	}
	routerError(err, url) {
		document.location = url || '/404'
	}
	routerDone() {
		console.log('Layout router done.')
		this.clearTimeouts()
		logPageView()
	}
	render() {
		return (
			<div>
				<Head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />

					<title>{createTitle('Website Title', 'Website description', this.props.title)}</title>
					<meta content={createDescription('Website description', this.props.description)} name='description' />

					<style>{style}</style>
					<link rel='icon' type='image/png' href='/static/img/w_32/favicon.png' />
					{env.ENABLE_ECOMMERCE &&
						<link type='text/css' rel='stylesheet' href='https://zygote.netlify.com/zygote-v1.css' />
					}
				</Head>
				{this.props.children}
				<PageLoadBar loading={this.state.loading} />
				{env.ENABLE_ECOMMERCE &&
					<script src='https://zygote.netlify.com/zygote-v1.js' />
				}
			</div>
		)
	}
}
