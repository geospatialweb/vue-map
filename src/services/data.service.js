import { Axios } from 'axios-observable';
import dataConfig from '../config/data.config';
import layerStylesConfig from '../config/layerStyles.config';
import markersConfig from '../config/markers.config';
import layerStylesService from './layerStyles.service';
import mapService from './map.service';
import markersService from './markers.service';
import store from '../store';

const dataStore = store;

export default {
	route: dataConfig.route,
	layerStyles: layerStylesConfig,
	markers: markersConfig,

	getData() {
		this.getMarkers();
		this.getLayerStyles();
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
					if (res.data) {
						markersService.setMarkers(this.markers[key].name, res.data);
					} else {
						console.error('Data Error:\n', res.data);
					}
				},
				(err) => {
					console.error('Query Failed:\n', err.error);
				},
				() => {
					if (dataStore.state.markers.length === Object.keys(this.markers).length) {
						markersService.createMarkersHash();
					}

					subscription.unsubscribe();
				});
		});
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

						layerStylesService.addLayerStyles(layerStyle);
						mapService.addLayerStyle(layerStyle);
					} else {
						console.error('Data Error:\n', res.data);
					}
				},
				(err) => {
					console.error('Query Failed:\n', err.error);
				},
				() => {
					if (dataStore.state.layerStyles.length === Object.keys(this.layerStyles).length) {
						layerStylesService.createLayerStylesHash();
					}

					subscription.unsubscribe();
				});
		});
	},
};
