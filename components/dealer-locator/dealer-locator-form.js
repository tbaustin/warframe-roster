import React from 'react';
import settings from 'components/_settings'
import DistanceSelect from 'components/dealer-locator/distance-select';

export default class extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			zip: this.props.zip,
			distance: this.props.distance || 30
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleZipInputChange = this.handleZipInputChange.bind(this);
		this.handleDistanceInputChange = this.handleDistanceInputChange.bind(this);
	}
	handleSubmit(event) {
		const zip = this.state.zip;
		const distance = this.state.distance;
		event.preventDefault();
		this.props.handleSubmit(this.state.zip, this.state.distance);
	}
	handleZipInputChange(event) {
		this.setState({zip: event.target.value});
	}
	handleDistanceInputChange(event) {
		this.setState({distance: event.target.value});
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.zip !== nextProps.zip) {
			this.setState({zip: nextProps.zip});
		}
	}
	render () {
		const inputId='input-'+(this.props.name || '');
		return (
			<form className="dealerLocatorForm" name={this.props.name} onSubmit={this.handleSubmit}>
				<label className="dealerLocatorForm__label" htmlFor={inputId}>{this.props.label}</label>
				<div className="dealerLocatorForm__controls">
					<input className="dealerLocatorForm__input" id={inputId} name={inputId} type="text" placeholder="FIND A LOCAL STORE" onChange={this.handleZipInputChange} value={this.state.zip || ''} />
					<div className="dealerLocatorForm__select">
						<DistanceSelect selected={this.state.distance} handleChange={this.handleDistanceInputChange} />
					</div>
					<button className="dealerLocatorForm__submit" type="submit">Go</button>
				</div>
				<style jsx>{`
					.dealerLocatorForm {
						box-sizing: border-box;
						display: table;
						padding: 1.5rem;
						width: 100%;
						height: 4rem;
						background: ${settings.navy};
					}
					.dealerLocatorForm__label, .dealerLocatorForm__controls {
						display: table-cell;
						vertical-align: middle;
						width: 50%;
					}

					.dealerLocatorForm__label {
						font-size: 1.2rem;
						font-weight: bold;
						text-transform: uppercase;
						letter-spacing: 1px;
						color: #fff;
					}

					.dealerLocatorForm__controls {
						text-align: right;
					}

					.dealerLocatorForm__input, .dealerLocatorForm__select, .dealerLocatorForm__submit {
						display: inline-block;
						vertical-align: middle;
						border: 0;
						font-size: 1rem;
					}

					.dealerLocatorForm__input, .dealerLocatorForm__submit {
						padding: 0.5em;
					}

					.dealerLocatorForm__input::placeholder, .dealerLocatorForm__select, .dealerLocatorForm__submit {
						text-transform: uppercase;
					}

					.dealerLocatorForm__input {
						width: 15em;
					}

					.dealerLocatorForm__input::placeholder {
						font-weight: bold;
					}

					.dealerLocatorForm__submit {
						background: ${settings.darkGray};
						color: #fff;
						cursor: pointer;
					}

					@media (max-width: 1000px) {
						.dealerLocatorForm {
							border-bottom: 4px solid ${settings.lightGray};
						}

						.dealerLocatorForm__input {
							width: 10em;
						}
					}

					@media (max-width: 750px) {
						.dealerLocatorForm__label, .dealerLocatorForm__controls {
							display: block;
							width: 100%;
							text-align: center;
						}

						.dealerLocatorForm__label {
							margin-bottom: 1rem;
						}
					}
				`}</style>
			</form>
		)
	}
}