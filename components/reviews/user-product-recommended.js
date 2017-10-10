import React from 'react'
import styles from '../_global-settings'

export default class extends React.Component {
	render() {
		const isRecommended = (this.props.recommended === true || this.props.recommended === 'true' || this.props.recommended === 'TRUE');

		if (!isRecommended) {
			return null;
		}

		return (
			<div className="userProductRecommended">
				<span className="userProductRecommended__check">{'\u2713'}</span>
				Yes, I recommend this product
				<style jsx>{`
					.userProductRecommended__check {
						display: inline-block;
						margin-right: 0.5rem;
						border: 1px solid #999;
					}
				`}</style>
			</div>
		)
	}
}