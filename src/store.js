import dataConfig from './config/data.config';
import layersConfig from './config/layers.config';
import mapStylesConfig from './config/mapStyles.config';
import splashScreenConfig from './config/splashScreen.config';

export default {
	state: {
		data: dataConfig,
		layers: layersConfig,
		layerStyles: [],
		layerStylesHash: {},
		mapStyles: mapStylesConfig,
		markers: [],
		markersHash: {},
		splashScreen: splashScreenConfig,
		trails: [],
		trailsHash: {},
	},

	addLayerStyle(layerStyle) {
		this.state.layerStyles.push(layerStyle);
	},

	addMarkers(markers) {
		this.state.markers.push(markers);
	},

	addTrails(trails) {
		trails.map(trail => this.state.trails.push(trail));
	},

	createLayerStylesHash() {
		this.state.layerStyles.map((layerStyle, i) => {
			this.state.layerStylesHash[layerStyle.id] = i;
			return true;
		});
	},

	createMarkersHash() {
		this.state.markers.map((marker, i) => {
			const name = marker[0].getElement().classList[0].replace('-marker', '');

			this.state.markersHash[name] = i;
			return true;
		});
	},

	createTrailsHash() {
		this.state.trails
			.filter((trail, i) => i > 0)
			.map((trail, i) => {
				this.state.trailsHash[trail.name] = i + 1;
				return true;
			});
	},

	getMapStyle() {
		let mapStyle;

		Object.keys(this.state.mapStyles).forEach((key) => {
			if (this.state.mapStyles[key].active) {
				mapStyle = this.state.mapStyles[key];
			}
		});

		return mapStyle;
	},

	setLayerActive(i) {
		if (Object.prototype.hasOwnProperty.call(this.state.layers[i], 'active')) {
			this.state.layers[i].active = !this.state.layers[i].active;
		}
	},

	setMapStyle(name) {
		let mapStyle;

		this.state.mapStyles[name].active = !this.state.mapStyles[name].active;

		name === this.state.mapStyles.outdoors.name ?
			mapStyle = this.state.mapStyles.satellite :
			mapStyle = this.state.mapStyles.outdoors;

		mapStyle.active = !mapStyle.active;
	},

	setMarkersActive(layer) {
		layer.hidden = !layer.hidden;

		layer.map((marker) => {
			marker._state === layer.state.inactive ?
				marker._state = layer.state.active :
				marker._state = layer.state.inactive;

			return true;
		});
	},

	setSplashScreen() {
		this.state.splashScreen.active = !this.state.splashScreen.active;
	},

	setTrailsActive(idx) {
		this.state.trails.map((trail, i) => {
			idx === i ? trail.active = true : trail.active = false;
			return true;
		});
	},
};
