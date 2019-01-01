import config from '../../config/config.json';
import events from '../../events';

const state = {
	layers: config.layers,
};

const mutations = {
	SET_LAYER_ACTIVE(state, i) {
		state.layers[i].active = !state.layers[i].active;
	},
};

const actions = {
	selectLayer(context, event) {
		events.layers.selectLayer.emit('selectLayer', event);
	},

	setLayerActive({ commit }, i) {
		commit('SET_LAYER_ACTIVE', i);
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
