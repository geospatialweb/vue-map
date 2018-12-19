import config from '../../config';
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
		events.styles.map.mapSettings.emit('mapSettings', state.map);
	},
	setMapSettings({ commit }, mapSettings) {
		commit('SET_MAP_SETTINGS', mapSettings);
	},
};

const MapModule = {
	state,
	actions,
	mutations,
};

export default MapModule;
