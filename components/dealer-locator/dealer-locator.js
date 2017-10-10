import React from 'react';
import DealerLocatorForm from 'components/dealer-locator/dealer-locator-form';
import DealerMap from 'components/embed/map/dealer-map';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			zip: this.props.zip,
			distance: this.props.distance
		}
		this.changeSearch = this.changeSearch.bind(this);
	}
	changeSearch(zip, distance) {
		this.setState({zip, distance});
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.zip !== nextProps.zip) {
			this.setState({zip: nextProps.zip});
		}
	}
	render() {
		return (
			<div className="dealerLocator">
				<div className="dealerLocator__form">
					<DealerLocatorForm label={this.props.label} name={this.props.name} handleSubmit={this.changeSearch} zip={this.state.zip} />
				</div>
				<div className="dealerLocator__map">
					<DealerMap mapStyles={this.props.mapStyles} brand={this.props.brand} zip={this.state.zip} distance={this.state.distance} />
				</div>
				<style jsx>{`
					.dealerLocator {
						position: relative;
						height: 800px;
					}

					.dealerLocator__form, .dealerLocator__map {
						position: absolute;
						top: 0;
						width: 100%;
					}

					.dealerLocator__form {
						z-index: 2;
					}

					@media (max-width: 1000px) {
						.dealerLocator {
							position: static;
							height: auto;
						}
						.dealerLocator__form, .dealerLocator__map {
							position: static;
						}

						.dealerLocator__form {
							z-index: auto;
						}
					}
				`}</style>
			</div>
		)
	}
}