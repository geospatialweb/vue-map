'use strict';

import { layers } from '../config/layers.config';

export const layersStore = {
	state: {
		layers
	},

	setLayerActive(index) {
		if (this.state.layers[index].hasOwnProperty('active')) {
			this.state.layers[index].active = !this.state.layers[index].active;
		}
	}
}
