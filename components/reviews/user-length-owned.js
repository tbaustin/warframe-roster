import React from 'react'
import styles from '../_global-settings'

export default class extends React.Component {
	fetchOption(optionId) {
		const options = [
			'1 week',
			'1 month',
			'3 months',
			'6 months',
			'1 - 3 years',
			'4 years or longer'
		];

		return (options[optionId - 1] || null);
	}
	render() {
		if (this.fetchOption(this.props.optionId) === null) {
			return null;
		}
		return (
			<div className="userLengthOwned">
				<span className="userLengthOwned__label">Length of Ownership:</span> {this.fetchOption(this.props.optionId)}
			</div>
		)
	}
}