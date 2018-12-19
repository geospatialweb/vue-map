import * as io from 'socket.io-client';
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
		const socket = io(config.socket.url);

		Object.keys(config.layerStyles).map((key) => {
			const params = {
				fields: config.layerStyles[key].fields,
				table: config.layerStyles[key].name,
			};

			socket
				.emit(config.socket.event, params)
				.on(params.table, (geojson) => {
					if (geojson) {
						const layerStyle = config.layerStyles[key].layer;
						layerStyle.source.data = geojson;

						commit('LOAD_LAYERSTYLE', layerStyle);

						if (state.layerStyles.length === Object.keys(config.layerStyles).length) {
							commit('CREATE_LAYERSTYLES_HASH');
						}
					} else {
						console.log(`Data Error:\n ${geojson}`);
					}
				});

			return true;
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
