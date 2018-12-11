import layersConfig from '../config/layers.config';

export default {
	state: {
		layers: layersConfig,
	},

	setLayerActive(i) {
		if (Object.prototype.hasOwnProperty.call(this.state.layers[i], 'active')) {
			this.state.layers[i].active = !this.state.layers[i].active;
		}
	},
};
