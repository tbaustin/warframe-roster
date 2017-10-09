import React from 'react'
import NoSSR from 'react-no-ssr'
import Head from 'next/head'
import { initGA, logPageView } from 'utils/analytics'
import pkg from '../package.json'
import style from '../styles/index.css'
import fastclick from 'react-fastclick'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'
import Loader from 'components/loader'
import Modal from 'components/modal'
import DealerLocator from 'components/dealer-locator/dealer-locator'
import mapStyles from '../styles/mapStyle.json'

fastclick()

export default class Layout extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mapOpen: false,
			mapZip: '47713'
		}
		this.handleDealerSearch = this.handleDealerSearch.bind(this);
	}
	componentDidMount(){
		// Google Analytics
		if(!window.GA_INITIALIZED){
			initGA()
			window.GA_INITIALIZED = true
		}
		logPageView()

		// Zygote
		if('zygote' in window){
			zygote.findButtons()
			zygote.findQty()
			zygote.findIcons()
		}
	}
	handleDealerSearch(zip) {
		console.log('opening popup dealer search');
		this.setState({
			mapOpen: true
		});
		if (zip) {
			this.setState({
				mapZip: zip
			})
		}
	}
	render(){
		const delimeter = ' | '
		const siteName = pkg.title || pkg.name
		let pageTitle = this.props.title
		let title
		if(pageTitle){
			title = `${pageTitle}${delimeter}${siteName}`
		}
		else if(pkg.description){
			title = `${siteName}${delimeter}${pkg.description}`
		}
		else{
			title = siteName
		}
		return (
			<div>
				<Head>
					<title>{ title }</title>
					<meta charSet='utf-8' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
					<meta content={ this.props.description ? this.props.description : pkg.description } name='description' />
					<style>{ style }</style>
					<link type='text/css' rel='stylesheet' href='https://zygote.netlify.com/zygote-v1.css' />
					<link rel='icon' type='image/x-icon' href='/static/img/favicon.ico' />
				</Head>
				<Header handleDealerSearch={this.handleDealerSearch} />
				{ this.props.children }
				<NoSSR onSSR={<Loader />}>
					<Modal open={this.state.mapOpen} onClose={() => this.setState({mapOpen: false})}>
						<DealerLocator label="Find a dealer or local store near you" name="dealerLocator-standalone" brand="goalrilla" mapStyles={ mapStyles.styles } distance="30" zip={this.state.mapZip} />
					</Modal>
				</NoSSR>
				<Footer handleDealerSearch={this.handleDealerSearch} />
				<script src='https://zygote.netlify.com/zygote-v1.js'></script>
			</div>
		)
	}
}
