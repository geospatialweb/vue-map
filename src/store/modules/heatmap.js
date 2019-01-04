import config from '../../config/config.json';

const state = {
	heatmap: {
		active: config.heatmap.active,
		class: config.heatmap.id,
		coverage: config.heatmap.coverage,
		radius: config.heatmap.radius,
		upperPercentile: config.heatmap.upperPercentile,
	},
};

const mutations = {
	REINITIALIZE_PARAMS(state) {
		state.heatmap.coverage = config.heatmap.coverage;
		state.heatmap.radius = config.heatmap.radius;
		state.heatmap.upperPercentile = config.heatmap.upperPercentile;
	},
	SET_ACTIVE(state) {
		state.heatmap.active = !state.heatmap.active;
	},
	SET_PARAMS(state, { param, value }) {
		state.heatmap[param] = value;
	},
};

const actions = {
	reinitializeParams({ commit }) {
		commit('REINITIALIZE_PARAMS');
	},
	setActive({ commit }) {
		commit('SET_ACTIVE');
	},
	setParams({ commit }, { param, value }) {
		commit('SET_PARAMS', { param, value });
	},
};

const getters = {
	heatmap: state => state.heatmap,
};

const heatmapModule = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};

export default heatmapModule;
