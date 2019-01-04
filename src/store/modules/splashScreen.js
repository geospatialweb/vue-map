import config from '../../config/config.json';

const state = {
	splashScreen: config.splashScreen,
};

const mutations = {
	SET_ACTIVE(state) {
		state.splashScreen.active = !state.splashScreen.active;
	},
};

const actions = {
	setActive({ commit }) {
		commit('SET_ACTIVE');
	},
};

const getters = {
	splashScreen: state => state.splashScreen,
};

const splashScreenModule = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};

export default splashScreenModule;
