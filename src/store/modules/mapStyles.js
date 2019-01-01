import config from '../../config/config.json';
import events from '../../events';

const state = {
	mapStyles: config.map.styles,
};

const mutations = {
	SET_MAPSTYLE_ACTIVE(state, name) {
		state.mapStyles[name].active = !state.mapStyles[name].active;
	},
};

const actions = {
	getMapStyle() {
		const mapStyle = Object.keys(state.mapStyles).find(key => state.mapStyles[key].active);
		events.mapStyles.mapStyle.emit('mapStyle', state.mapStyles[mapStyle]);
	},
	setMapStyle({ commit }, name) {
		commit('SET_MAPSTYLE_ACTIVE', name);

		let mapStyleName;

		name === state.mapStyles.outdoors.name ?
			mapStyleName = state.mapStyles.satellite.name :
			mapStyleName = state.mapStyles.outdoors.name;

		commit('SET_MAPSTYLE_ACTIVE', mapStyleName);
	},
};

const mapStylesModule = {
	namespaced: true,
	state,
	mutations,
	actions,
};

export default mapStylesModule;
