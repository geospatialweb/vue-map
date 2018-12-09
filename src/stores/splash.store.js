import { splash } from '../config/splash.config';

export const splashStore = {
	state: {
		splash,
	},

	setLayerActive() {
		this.state.splash.splashElement.active = !this.state.splash.splashElement.active;
	},
};
