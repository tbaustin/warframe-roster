import React from 'react';
import settings from 'components/_settings'

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
		this.props.handleChange(event);
	}
	render() {
		return (
			<select onChange={this.handleChange} value={this.props.selected}>
				<option value="15">15 miles</option>
				<option value="30">30 miles</option>
				<option value="50">50 miles</option>
				<option value="100">100 miles</option>
				<style jsx>{`
					select {
						border: 0;
						border-radius: 0;
						-webkit-appearance: none;
						padding: 0.5em 2rem 0.5em 0.5em;
						font-size: inherit;
						text-transform: inherit;
						background-color: ${settings.lightGray};
						background-image: url('/static/down-arrow.png');
						background-size: 0.7em;
						background-repeat: no-repeat;
						background-position: 90% center;
						color: ${settings.black};
						cursor: pointer;
					}
				`}</style>
			</select>
		)
	}
}