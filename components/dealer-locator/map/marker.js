import React from 'react';

export default class extends React.Component {
	render() {

		const detailsShowClass = this.props.showDetails ? ' mapMarker__details--active' : '';
		const websiteShowClass = this.props.web ? ' mapMarker__website--show' : '';
		const emailShowClass = this.props.email ? ' mapMarker__email--show' : '';
		const phoneShowClass = this.props.phone ? ' mapMarker__phone--show' : '';
		const rawPhone = this.props.phone.replace(/[\(\)-\s]/g, '');
		
		return (
			<div>
				<div className="mapMarker">
					<div className="mapMarker__marker" onClick={() => this.props.handleMarkerClick(this.props.id)}>
						<img src="/static/img/map-marker.png" className="mapMarker__image" />
					</div>
					<div className={'mapMarker__details'+detailsShowClass}>
						<button onClick={() => this.props.handleMarkerClose(this.props.id)} className="mapMarker__closeDetails">X</button>
						<h1 className="mapMarker__title">{this.props.name}</h1>
						<address className="mapMarker__address">
							{this.props.address.address}<br />
							{this.props.address.city}, {this.props.address.state} {this.props.address.zip} {this.props.address.country}
						</address>
						<div className={'mapMarker__website'+websiteShowClass}>
							<a href={this.props.web}>{this.props.web}</a>
						</div>
						<div className={'mapMarker__email'+emailShowClass}>
							<a href={'mailto:'+this.props.email}>{this.props.email}</a>
						</div>
						<div className={'mapMarker__phone'+phoneShowClass}>
							<a href={'tel:'+rawPhone}>{this.props.phone}</a>
						</div>
					</div>
				</div>
				<style jsx>{`
					.mapMarker__marker {
						cursor: pointer;
					}

					.mapMarker__image {
						max-height: 40px;
						max-width: 40px;
						height: auto;
						width: auto;
					}

					.mapMarker__details, .mapMarker__website, .mapMarker__phone, .mapMarker__email {
						display: none;
					}

					.mapMarker__details.mapMarker__details--active, .mapMarker__website.mapMarker__website--show, .mapMarker__phone.mapMarker__phone--show, .mapMarker__email.mapMarker__email--show {
						display: block;
					}

					.mapMarker__details.mapMarker__details--active {
						position: relative;
						bottom: 11rem;
						right: 6.5rem;
						z-index: 2;
						width: 15rem;
						background: #fff;
						padding: 1rem;
					}

					.mapMarker__details.mapMarker__details--active:after {
						z-index: -1;
						position: absolute;
						top: 98.1%;
						left: calc(7.5rem - 20px);
						content: '';
						width: 0;
						height: 0;
						border-top: 25px solid #fff;
						border-left: 20px solid transparent;
						border-right: 20px solid transparent;
					}

					.mapMarker__closeDetails {
						position: absolute;
						top: 0.5rem;
						right: 0.5rem;
						border: 0;
						margin: 0;
						padding: 0;
						font-size: 1rem;
						font-weight: bold;
						background: transparent;
						cursor: pointer;
					}

					.mapMarker__title {
						margin-top: 0;
						font-size: 1rem;
						font-weight: bold;
					}

					.mapMarker__title, .mapMarker__address {
						margin-bottom: 0.3rem;
					}

					.mapMarker__address {
						font-size: 0.8rem;
						font-style: normal;
					}

					@media (max-width: 900px) {
						.mapMarker__details.mapMarker__details--active {
							bottom: 13.5rem;
							right: 9rem;
							width: 20rem;
						}

						.mapMarker__details.mapMarker__details--active:after {
							left: calc(10rem - 20px);
						}

						.mapMarker__address, .mapMarker__website, .mapMarker__email, .mapMarker__phone {
							font-size: 0.9rem;
						}

						.mapMarker__website, .mapMarker__email, .mapMarker__phone {
							margin-top: 0.8rem;
						}
					}
				`}</style>
			</div>
		)
	}
}