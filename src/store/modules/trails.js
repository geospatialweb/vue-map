import config from '../../config/config.json';
import ee from '../../events';

const state = {
	disabled: false,
	trails: [],
	trailsHash: {},
};

const mutations = {
	CREATE_TRAILS_HASH(state) {
		state.trails
			.filter((trail, i) => i > 0)
			.map((trail, i) => {
				state.trailsHash[trail.name] = i + 1;
				return true;
			});
	},
	LOAD_TRAILS(state, trails) {
		trails.map(trail => state.trails.push(trail));
	},
	SET_ACTIVE(state, idx) {
		state.trails.map((trail, i) => {
			i === idx ?
				state.trails[i].active = true :
				state.trails[i].active = false;

			return true;
		});
	},

	SET_DISABLED(state) {
		state.disabled = !state.disabled;
	},
};

const actions = {
	getTrails({ commit }) {
		commit('LOAD_TRAILS', config.trails);
		commit('CREATE_TRAILS_HASH');
	},

	selectTrail(context, event) {
		ee.emit('selectTrail', event);
	},

	setActive({ commit }, i) {
		commit('SET_ACTIVE', i);
	},

	setDisabled({ commit }) {
		commit('SET_DISABLED');
	},
};

const getters = {
	disabled: state => state.disabled,
	trails: state => state.trails,
};

const trailsModule = {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};

export default trailsModule;
