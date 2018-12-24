import * as io from 'socket.io-client';
import config from '../../config';
import events from '../../events';

const state = {
	markers: [],
	markersHash: {},
};

const mutations = {
	CREATE_MARKERS_HASH(state) {
		state.markers.map((marker, i) => {
			const name = marker[0].getElement().classList[0].replace('-marker', '');

			state.markersHash[name] = i;
			return true;
		});
	},
	LOAD_MARKER(state, marker) {
		state.markers.push(marker);

		if (state.markers.length === Object.keys(config.markers).length) {
			this.dispatch('markers/createMarkersHash');
		}
	},
	SET_MARKER_ACTIVE(state, marker) {
		marker.active = !marker.active;
	},
	SET_MARKER_HIDDEN(state, marker) {
		marker.hidden = !marker.hidden;
	},
};

const actions = {
	getMarkers() {
		Object.keys(config.markers).map((key) => {
			const params = {
				fields: config.markers[key].fields,
				table: config.markers[key].name,
			};

			io(config.socket.url)
				.emit(config.socket.event, params)
				.on(params.table, (geojson) => {
					geojson ?
						events.markers.setMarker.emit('setMarker', config.markers[key], geojson) :
						console.error('Data Error:\n', geojson);
				});

			return true;
		});
	},

	createMarkersHash({ commit }) {
		commit('CREATE_MARKERS_HASH');
	},

	loadMarker({ commit }, marker) {
		commit('LOAD_MARKER', marker);
	},

	setMarkerActive({ commit }, marker) {
		commit('SET_MARKER_ACTIVE', marker);
	},

	setMarkerHidden({ commit }, marker) {
		commit('SET_MARKER_HIDDEN', marker);
	},
};

const markersModule = {
	namespaced: true,
	state,
	mutations,
	actions,
};

export default markersModule;
