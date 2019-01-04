import config from '../../config/config.json';
import ee from '../../events';

const state = {
	layers: config.layers,
};

const mutations = {
	SET_ACTIVE(state, i) {
		state.layers[i].active = !state.layers[i].active;
	},
};

const actions = {
	selectLayer(context, event) {
		ee.emit('selectLayer', event);
	},

	setActive({ commit }, i) {
		commit('SET_ACTIVE', i);
	},
};

const getters = {
	layers: state => state.layers,
};

const layersModule = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};

export default layersModule;
