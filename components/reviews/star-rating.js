import React from 'react'
import styles from '../_global-settings'
import Star from 'components/reviews/star'

export default class extends React.Component {
	render() {
		// setup star elements
		const stars = [];
		const rating = parseInt(this.props.rating);
		const emptyStarCount = 5 - (rating);

		for (let i=0; i<rating; i++) {
			stars.push(<Star fill="1" />);
		}

		for (let i=0; i<emptyStarCount; i++) {
			stars.push(<Star fill="0" />);
		}

		return (
			<div>
				{stars}
			</div>
		)
	}
}