import config from '../../config';

const state = {
	splashScreen: config.splashScreen,
};

const mutations = {
	SET_SPLASHSCREEN_ACTIVE(state) {
		state.splashScreen.active = !state.splashScreen.active;
	},
};

const actions = {
	setSplashScreenActive({ commit }) {
		commit('SET_SPLASHSCREEN_ACTIVE');
	},
};

const splashScreenModule = {
	state,
	actions,
	mutations,
};

export default splashScreenModule;
