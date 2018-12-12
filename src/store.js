import layersConfig from './config/layers.config';
import splashConfig from './config/splash.config';
import trailsConfig from './config/trails.config';

export default {
	state: {
		layers: layersConfig,
		layerStyles: [],
		markers: [],
		splash: splashConfig,
		trails: trailsConfig,
	},

	setLayerActive(i) {
		if (Object.prototype.hasOwnProperty.call(this.state.layers[i], 'active')) {
			this.state.layers[i].active = !this.state.layers[i].active;
		}
	},

	addLayerStyle(layerStyle) {
		this.state.layerStyles.push(layerStyle);
	},

	addMarkers(markers) {
		this.state.markers.push(markers);
	},

	setSplashElementActive() {
		this.state.splash.splashElement.active = !this.state.splash.splashElement.active;
	},

	setTrailsActive(index) {
		this.state.trails.map((trail, i) => {
			index === i ? trail.active = true : trail.active = false;
			return true;
		});
	},
};
