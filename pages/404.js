import React from 'react'
import Layout from 'components/_layout'

export default class Error extends React.Component {
	render () {
		return (
			<Layout>
				<div className="errorPage">
					<p className="errorPage__error">404: Page Not Found</p>
				</div>
				<style jsx>{`
					.errorPage {
						text-align: center;
						padding: 30vh 30px 40vh 30px;
					}

					.errorPage__error {
						font-weight: bold;
						font-size: 1.5rem;
					}
				`}</style>
			</Layout>
		)
	}
}
