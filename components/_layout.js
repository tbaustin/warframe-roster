import React from 'react'
import { routerAdd, routerRemove } from 'utils/router-events'
import { initGA } from 'utils/analytics'
import fastclick from 'react-fastclick'
import PageLoadBar from 'components/page-load-animation'
import Head from 'next/head'
import env from 'json/env.json'
import createTitle from 'utils/create-page-title'
import createDescription from 'utils/create-page-description'
import NoSSR from 'react-no-ssr'
import style from 'components/_global-styles.css'

fastclick()

export default class Layout extends React.Component {
	constructor(props) {
		super(props)
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
		initGA()

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
		this.clearTimeouts()
	}
	render() {
		return (
			<div>
				<Head>
					<title>{createTitle('Website Title', 'Website description', this.props.title)}</title>
					<meta content={createDescription('Website description', this.props.description)} name='description' />
				</Head>
				{this.props.children}

			</div>
		)
	}
}
