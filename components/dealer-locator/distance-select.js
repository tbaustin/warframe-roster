import React from 'react';
import settings from 'components/_settings'
import Select from 'components/forms/select'

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
			<Select onChange={this.handleChange} value={this.props.selected}>
				<option value="15">15 miles</option>
				<option value="30">30 miles</option>
				<option value="50">50 miles</option>
				<option value="100">100 miles</option>
			</Select>
		)
	}
}