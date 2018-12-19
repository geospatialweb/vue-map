import { Axios } from 'axios-observable';
import config from '../../config';
import events from '../../events';

const state = {
	layerStyles: [],
	layerStylesHash: {},
};

const mutations = {
	CREATE_LAYERSTYLES_HASH(state) {
		state.layerStyles.map((layerStyle, i) => {
			state.layerStylesHash[layerStyle.id] = i;
			return true;
		});
	},
	LOAD_LAYERSTYLE(state, layerStyle) {
		state.layerStyles.push(layerStyle);
		events.layers.addLayerStyle.emit('addLayerStyle', layerStyle);
	},
	SET_LAYERSTYLE_ACTIVE(state, name) {
		const i = state.layerStylesHash[name];

		state.layerStyles[i].active = !state.layerStyles[i].active;

		state.layerStyles[i].active ?
			state.layerStyles[i].layout.visibility = 'visible' :
			state.layerStyles[i].layout.visibility = 'none';
	},
};

const actions = {
	getLayerStyles({ commit }) {
		Object.keys(config.layerStyles).forEach((key) => {
			const params = {
				fields: config.layerStyles[key].fields,
				table: config.layerStyles[key].name,
			};

			const subscription = Axios.get('/api/geojson/', { params })
				.subscribe((res) => {
					if (res.data) {
						const layerStyle = config.layerStyles[key].layer;
						layerStyle.source.data = res.data;

						commit('LOAD_LAYERSTYLE', layerStyle);
					} else {
						console.error('Data Error:\n', res.data);
					}
				},
				(err) => {
					console.error('Query Failed:\n', err.error);
				},
				() => {
					if (state.layerStyles.length === Object.keys(config.layerStyles).length) {
						commit('CREATE_LAYERSTYLES_HASH');
					}

					subscription.unsubscribe();
				});
		});
	},
	setLayerStyleActive({ commit }, name) {
		commit('SET_LAYERSTYLE_ACTIVE', name);
	},
};

const layerStylesModule = {
	state,
	mutations,
	actions,
};

export default layerStylesModule;
