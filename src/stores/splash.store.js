'use strict';

import { splash } from '../config/splash.config';

export const splashStore = {
	state: {
		splash
	},

	setLayerActive(name) {
		this.state.splash[name].active = !this.state.splash[name].active;
	}
}
