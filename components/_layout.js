import React from 'react'
import Router from 'next/router'
import { initGA, logPageView } from 'utils/analytics'
import style from 'components/_global-styles.css'
import fastclick from 'react-fastclick'
import Loader from 'components/page-load-animation'
import Head from 'next/head'
import detectIe from 'detectie'
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
		this.showLoader = this.showLoader.bind(this)
		this.routerDone = this.routerDone.bind(this)
		this.routerError = this.routerError.bind(this)
		this.clearTimeouts = this.clearTimeouts.bind(this)
	}
	componentWillMount() {
		// Progress bar
		this.clearTimeouts()
		Router.onRouteChangeStart = url => {
			if (this.ie) return document.location = url
			this.clearTimeouts()
			this.uiTimeout = setTimeout(this.showLoader.bind(this), 100)
			//this.loadTimeout = setTimeout(() => this.routerError(url), 5000)
		}
		Router.onRouteChangeComplete = this.routerDone
		Router.onRouteChangeError = (err, url) => this.routerError(url)
	}
	componentDidMount() {
		let ie = detectIe()
		this.ie = (typeof ie === 'number' && ie <= 11) ? true : false

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

		// Progress bar
		this.clearTimeouts()
	}
	componentWillUnmount() {
		this.clearTimeouts()
	}
	clearTimeouts() {
		clearTimeout(this.uiTimeout)
		//clearTimeout(this.loadTimeout)
	}
	routerError(url) {
		document.location = url || '/404'
	}
	showLoader() {
		clearTimeout(this.uiTimeout)
		this.setState({ loading: true })
	}
	routerDone() {
		this.clearTimeouts()
		this.setState({ loading: false })
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
					<link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" />
					{!env.DISABLE_ECOMMERCE &&
						<link type='text/css' rel='stylesheet' href='https://zygote.netlify.com/zygote-v1.css' />
					}
				</Head>
				{this.props.children}
				<Loader loading={this.state.loading} />
				{!env.DISABLE_ECOMMERCE &&
					<script src='https://zygote.netlify.com/zygote-v1.js' />
				}
			</div>
		)
	}
}
