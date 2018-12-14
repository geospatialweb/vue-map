import { Axios } from 'axios-observable';
import dataConfig from '../config/data.config';
import layerStylesConfig from '../config/layerStyles.config';
import markersConfig from '../config/markers.config';
import trailsConfig from '../config/trails.config';
import mapService from './map.service';
import markersService from './markers.service';
import store from '../store';

export default {
	layerStyles: layerStylesConfig,
	markers: markersConfig,
	route: dataConfig.route,
	trails: trailsConfig,

	getData() {
		this.getTrails();
		this.getMarkers();
		this.getLayerStyles();
	},

	/* HTTP request to obtain layer styles from back-end PostGIS server */
	getLayerStyles() {
		Object.keys(this.layerStyles).forEach((key) => {
			const params = {
				fields: this.layerStyles[key].fields,
				table: this.layerStyles[key].name,
			};

			const subscription = Axios.get(this.route, { params })
				.subscribe((res) => {
					if (res.data) {
						const layerStyle = this.layerStyles[key].layer;
						layerStyle.source.data = res.data;

						mapService.addLayerStyle(layerStyle);
						store.addLayerStyle(layerStyle);
					} else {
						console.error('Data Error:\n', res.data);
					}
				},
				(err) => {
					console.error('Query Failed:\n', err.error);
				},
				() => {
					if (store.state.layerStyles.length === Object.keys(this.layerStyles).length) {
						store.createLayerStylesHash();
					}

					subscription.unsubscribe();
				});
		});
	},

	/* HTTP request to obtain markers from back-end PostGIS server */
	getMarkers() {
		Object.keys(this.markers).forEach((key) => {
			const params = {
				fields: this.markers[key].fields,
				table: this.markers[key].name,
			};

			const subscription = Axios.get(this.route, { params })
				.subscribe((res) => {
					res.data ?
						markersService.setMarkers(this.markers[key], res.data) :
						console.error('Data Error:\n', res.data);
				},
				(err) => {
					console.error('Query Failed:\n', err.error);
				},
				() => {
					if (store.state.markers.length === Object.keys(this.markers).length) {
						store.createMarkersHash();
					}

					subscription.unsubscribe();
				});
		});
	},

	getTrails() {
		store.addTrails(this.trails);
		store.createTrailsHash();
	},
};
