import { layers } from '../config/layers.config';

export const layersStore = {
	state: {
		layers,
	},

	setLayerActive(i) {
		if (Object.prototype.hasOwnProperty.call(layersStore.state.layers[i], 'active')) {
			this.state.layers[i].active = !this.state.layers[i].active;
		}
	},
};
