import splashConfig from '../config/splash.config';

export default {
	state: {
		splash: splashConfig,
	},

	setLayerActive() {
		this.state.splash.splashElement.active = !this.state.splash.splashElement.active;
	},
};
