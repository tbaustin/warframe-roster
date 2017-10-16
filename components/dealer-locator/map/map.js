import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from 'components/dealer-locator/map/marker'

const AnyReactComponent = ({ text }) => <div>{text}</div>;


export default class extends React.Component {
	constructor(props) {
		super(props);
		this.createMapOptions = this.createMapOptions.bind(this);
	}
	static defaultProps = {
		zoom: 11,
	}

	createMapOptions(maps) {
		return {
			styles: this.props.mapStyles
		}
	}

	render() {
		const markers = this.props.markers.map((marker) => (
			<Marker key={marker.id} id={marker.id} showDetails={marker.showDetails} handleMarkerClick={this.props.handleMarkerClick} handleMarkerClose={this.props.handleMarkerClose} lat={marker.lat} lng={marker.lng} type={marker.type} level={marker.dealerLevel} name={marker.name} address={marker.address} phone={marker.phone} web={marker.web} email={marker.email} />
		));
		return (
			<div>
				<GoogleMapReact options={this.createMapOptions} center={this.props.center} zoom={this.props.zoom}>
				{markers}
				</GoogleMapReact>
				<style jsx>{`
					div{
						height: 800px;
						width: 100%;
						margin: 0;
					}

					@media (max-width: 1000px) {
						div {
							height: 400px;
						}
					}
				`}</style>
			</div>
		);
	}
}
