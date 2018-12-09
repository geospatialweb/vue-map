import { splashStore } from '../stores/splash.store';

export const splashService = {
	splashStore,

	hideSplash() {
		this.splashStore.setLayerActive();
	},
};
