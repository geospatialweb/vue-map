import splashStore from '../stores/splash.store';

export default {
	splashStore,

	hideSplash() {
		this.splashStore.setLayerActive();
	},
};
