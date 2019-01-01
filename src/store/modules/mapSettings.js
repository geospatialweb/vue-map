import config from '../../config/config.json';
import events from '../../events';

const state = {
	mapSettings: config.map.settings,
};

const mutations = {
	SET_MAP_SETTINGS(state, mapSettings) {
		state.mapSettings = mapSettings;
	},
};

const actions = {
	getMapSettings() {
		events.mapSettings.mapSettings.emit('mapSettings', state.map);
	},
	setMapSettings({ commit }, mapSettings) {
		commit('SET_MAP_SETTINGS', mapSettings);
	},
};

const MapModule = {
	namespaced: true,
	state,
	mutations,
	actions,
};

export default MapModule;
