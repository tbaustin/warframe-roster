import React from 'react'
import styles from '../_global-settings'

export default class extends React.Component {
	fetchOption(optionId) {
		const options = [
			'Female',
			'Male',
			'Nonbinary',
			'Other'
		];

		return (options[optionId - 1] || null);
	}
	render() {
		if (this.fetchOption(this.props.optionId) === null) {
			return null;
		}
		return (
			<div className="userGender">
				<span className="userGender__label">Gender:</span> {this.fetchOption(this.props.optionId)}
			</div>
		)
	}
}