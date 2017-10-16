import React from 'react'
import fetch from 'isomorphic-fetch'
import settings from 'components/_settings'
import Map from 'components/dealer-locator/map/map'
import DealerList from 'components/dealer-locator/dealer-list'

/* Setup marker objects to pass to a generic Map component */
function createMarkers(data, brand) {
	const markers = [];
	let idInt = 1;
	for (let dealer of data.results) {
		markers.push({
			id: 'marker-'+idInt,
			type: 'dealer',
			distance: dealer.distNum,
			lat: dealer.latitude,
			lng: dealer.longitude,
			name: dealer.name,
			dealerLevel: dealer.brand[brand] ? dealer.brand[brand].dealer_level : null,
			address: {
				address: dealer.address,
				city: dealer.city,
				state: dealer.state,
				zip: dealer.zip,
				country: dealer.country
			},
			phone: dealer.phone,
			web: dealer.web,
			email: dealer.email,
			showDetails: false
		});

		idInt++;
	}
	return markers;
}

/* fetch dealers from API */
function fetchDealers(brand, zip, distance) {
	const endpoint = 'https://aqzsc3u467.execute-api.us-east-1.amazonaws.com/dev/dealers/proximity/' + brand + '/' + zip + '/' + distance;
	return fetch(endpoint).then(response => {
		if (response.status >= 400) {
			throw new Error('Bad response from server');
		}
		return response.json();
	});
}

/* fetch GPS coordinates from a zip code */
function fetchCoordsFromZip(zip) {
	const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:' + zip + '&sensor=false';
	return fetch(endpoint).then(response => {
		if (response.status >= 400) {
			throw new Error('Bad response from server');
		}
		return response.json();
	})
}

/* fetch and create markers */
function fetchMarkers(brand, zip, distance) {
	return fetchDealers(brand, zip, distance)
	.then(dealerData => {
		console.dir(dealerData);
		return createMarkers(dealerData, brand);
	}).catch(err => {
		console.error('Error creating dealer markers: '+err);
	});
}

/* locate marker in array by ID */
function findMarkerIndex(id, markers) {
	for (let i=0; i<markers.length; i++) {
		if (markers[i].id === id) {
			return i;
		}
	}
	return null;
}

/* sets all markers in passed-in array to closed and returns array */
function setAllMarkersClosed(markers) {
	for (let marker of markers) {
		marker.showDetails = false;
	}
	return markers;
}



export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			markers: [],
			center: {},
			zoom: null
		}
		this.openMarker = this.openMarker.bind(this);
		this.closeMarker = this.closeMarker.bind(this);
		this.updateZoom = this.updateZoom.bind(this);
	}
	/* sets marker with id key 'id' to open */
	openMarker(id) {
		const index = findMarkerIndex(id, this.state.markers);
		if (index !== null) {
			const markers = setAllMarkersClosed(this.state.markers); // closes all open markers
			markers[index].showDetails = true;
			this.setState({markers});
		}
	}
	/* sets marker with id key 'id' to closed */
	closeMarker(id) {
		const index = findMarkerIndex(id, this.state.markers);
		if (index !== null) {
			const markers = this.state.markers;
			markers[index].showDetails = false;
			this.setState({markers});
		}
	}
	/* sets map markers */
	updateMarkers(brand, zip, distance) {
		return fetchMarkers(brand, zip, distance).then(markers => {
			this.setState({markers});
		});
	}
	/* sets map center */
	updateCenter(zip) {
		return fetchCoordsFromZip(zip).then(zipData => {
			this.setState({center: zipData.results[0].geometry.location});
		});
	}
	updateZoom(distance) {
		let zoom = 10;
		if (distance > 50) {
			zoom = 7;
		}
		else if (distance > 30) {
			zoom = 8;
		}
		else if (distance > 15) {
			zoom = 9;
		}
		this.setState({zoom});
	}
	componentWillReceiveProps(nextProps) {
		const newZip = (this.props.zip !== nextProps.zip);
		if (newZip || (this.props.distance !== nextProps.distance)) {
			this.updateZoom(nextProps.distance);
			this.updateMarkers(nextProps.brand, nextProps.zip, nextProps.distance);
			this.updateCenter(nextProps.zip);
		}
	}
	componentDidMount() {
		this.updateZoom(this.props.distance);
		this.updateMarkers(this.props.brand, this.props.zip, this.props.distance);
		this.updateCenter(this.props.zip);
	}
	render() {
		return (
			<div className="dealerMap">
				<div className="dealerMap__list">
					<DealerList dealers={this.state.markers} />
				</div>
				<div className="dealerMap__map">
					<Map zoom={this.state.zoom} center={this.state.center} mapStyles={this.props.mapStyles} markers={this.state.markers} handleMarkerClick={this.openMarker} handleMarkerClose={this.closeMarker}></Map>
				</div>

				<style jsx>{`
					.dealerMap {
						border: 4px solid ${settings.navy};
					}

					.dealerMap__map, .dealerMap__list {
						display: inline-block;
						vertical-align: top;
					}

					.dealerMap__map {
						width: 67%;
					}

					.dealerMap__list {
						width: 33%;
					}

					.dealerMap__list {
						height: 800px;
					}

					@media (max-width: 1000px) {
						.dealerMap__map, .dealerMap__list {
							display: block;
							width: 100%;
						}

						.dealerMap__list {
							height: 400px;
						}
					}
				`}</style>
			</div>
		)
	}
}
