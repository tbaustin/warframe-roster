import React from 'react'
import { initGA } from 'utils/analytics'
import fastclick from 'react-fastclick'
import PageLoadBar from 'components/page-load-animation'
import Head from 'next/head'
import createTitle from 'utils/create-page-title'
import createDescription from 'utils/create-page-description'
import clientTimeoutError from 'utils/client-timeout-error'
import zygoteRefresh from 'utils/zygote-refresh'
import NoSSR from 'react-no-ssr'

fastclick()

export default class Layout extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		initGA()
		clientTimeoutError()
		zygoteRefresh()
	}
	render() {
		return (
			<div>
				<Head>
					<title>{createTitle('Website Title', 'Website description', this.props.title)}</title>
					<meta content={createDescription('Website description', this.props.description)} name='description' />
				</Head>
				{this.props.children}
				<NoSSR>
					<PageLoadBar />
				</NoSSR>
			</div>
		)
	}
}
