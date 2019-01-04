import config from '../../config/config.json';
import ee from '../../events';

const state = {
	mapStyles: config.map.styles,
};

const mutations = {
	SET_ACTIVE(state, name) {
		state.mapStyles[name].active = !state.mapStyles[name].active;
	},
};

const actions = {
	getStyle() {
		const mapStyle = Object.keys(state.mapStyles).find(key => state.mapStyles[key].active);
		ee.emit('mapStyle', state.mapStyles[mapStyle]);
	},
	setStyle({ commit }, name) {
		commit('SET_ACTIVE', name);

		let mapStyleName;

		name === state.mapStyles.outdoors.name ?
			mapStyleName = state.mapStyles.satellite.name :
			mapStyleName = state.mapStyles.outdoors.name;

		commit('SET_ACTIVE', mapStyleName);
	},
};

const mapStylesModule = {
	namespaced: true,
	state,
	mutations,
	actions,
};

export default mapStylesModule;
