import { Axios } from 'axios-observable';
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
	},
	SET_MARKER_ACTIVE(state, marker) {
		marker.active = !marker.active;
	},
	SET_MARKER_HIDDEN(state, marker) {
		marker.hidden = !marker.hidden;
	},
};

const actions = {
	getMarkers({ commit }) {
		const { markers } = config;

		Object.keys(markers).map((key) => {
			const params = {
				fields: markers[key].fields,
				table: markers[key].name,
			};

			const subscription = Axios.get('/api/geojson', { params })
				.subscribe((res) => {
					res.data ?
						events.markers.setMarker.emit('setMarker', markers[key], res.data) :
						console.error('Data Error:\n', res.data);
				},
				(err) => {
					console.error('Query Failed:\n', err.error);
				},
				() => {
					if (state.markers.length === Object.keys(markers).length) {
						commit('CREATE_MARKERS_HASH');
					}

					subscription.unsubscribe();
				});

			return true;
		});
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
