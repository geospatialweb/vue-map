import store from '../store';

const dataStore = store;

export default {
	hideSplash() {
		dataStore.setSplashElementActive();
	},
};
