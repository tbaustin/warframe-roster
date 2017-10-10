import React from 'react'
import Router from 'next/router'
import { initGA, logPageView } from 'utils/analytics'
import style from 'components/_global-styles.css'
import fastclick from 'react-fastclick'
import settings from 'components/_settings'
import Loader from 'components/page-load-animation'
import Head from 'next/head'
import detectIe from 'detectie'
import env from 'json/env.json'
import {name} from '../package.json'

const siteName = 'Website Title'
const description = 'Website description'

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
			this.loadTimeout = setTimeout(() => this.routerError(url), 5000)
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
				zygote.api = process.env.ZYGOTE_API
				zygote.properties = {
					site: 'bear'
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
		clearTimeout(this.loadTimeout)
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

		// Get title
		const delimeter = ' | '
		let pageTitle = this.props.title
		let displayTitle
		if (pageTitle) {
			displayTitle = `${pageTitle}${delimeter}${siteName}`
		}
		else if (description) {
			displayTitle = `${siteName}${delimeter}${description}`
		}
		else {
			displayTitle = siteName
		}
		return (
			<div className={`cont ${!pageTitle && 'home'}`}>
				<Head>
					<title>{displayTitle}</title>
					<meta charSet='utf-8' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
					<meta content={this.props.description ? this.props.description : description} name='description' />
					<style>{style}</style>
					<link rel='icon' type='image/png' href='/static/img/favicon.png' />
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
