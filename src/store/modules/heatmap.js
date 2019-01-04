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
	REINITIALIZE_HEATMAP_PARAMS(state) {
		state.heatmap.coverage = config.heatmap.coverage;
		state.heatmap.radius = config.heatmap.radius;
		state.heatmap.upperPercentile = config.heatmap.upperPercentile;
	},
	SET_HEATMAP_ACTIVE(state) {
		state.heatmap.active = !state.heatmap.active;
	},
	SET_HEATMAP_PARAMS(state, { param, value }) {
		state.heatmap[param] = value;
	},
};

const actions = {
	reinitializeHeatmapParams({ commit }) {
		commit('REINITIALIZE_HEATMAP_PARAMS');
	},
	setHeatmapActive({ commit }) {
		commit('SET_HEATMAP_ACTIVE');
	},
	setHeatmapParams({ commit }, { param, value }) {
		commit('SET_HEATMAP_PARAMS', { param, value });
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
