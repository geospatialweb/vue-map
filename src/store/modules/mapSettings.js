import config from '../../config/config.json';
import ee from '../../events';

const state = {
	mapSettings: config.map.settings,
};

const mutations = {
	SET_SETTINGS(state, mapSettings) {
		state.mapSettings = mapSettings;
	},
};

const actions = {
	getSettings() {
		ee.emit('mapSettings', state.map);
	},
	setSettings({ commit }, mapSettings) {
		commit('SET_SETTINGS', mapSettings);
	},
};

const MapModule = {
	namespaced: true,
	state,
	mutations,
	actions,
};

export default MapModule;
