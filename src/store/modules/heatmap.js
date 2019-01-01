import config from '../../config/config.json';

const state = {
	heatmap: {
		active: config.heatmap.active,
		class: config.heatmap.id,
	},
};

const mutations = {
	SET_HEATMAP_ACTIVE(state) {
		state.heatmap.active = !state.heatmap.active;
	},
};

const actions = {
	setHeatmapActive({ commit }) {
		commit('SET_HEATMAP_ACTIVE');
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
