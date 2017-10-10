import React from 'react'
import styles from '../_global-settings'

export default class extends React.Component {
	fetchOption(optionId) {
		const options = [
			'10 or under',
			'11 - 14',
			'15 - 18',
			'19 - 24',
			'25 - 35',
			'36 - 44',
			'45 or older'
		];

		return (options[optionId - 1] || null);
	}
	render() {
		if (this.fetchOption(this.props.optionId) === null) {
			return null;
		}
		return (
			<div className="userAge">
				<span className="userAge__label">Age:</span> {this.fetchOption(this.props.optionId)}
			</div>
		)
	}
}