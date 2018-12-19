import Vue from 'vue';
import Vuex from 'vuex';
import layers from './modules/layers';
import layerStyles from './modules/layerStyles';
import map from './modules/map';
import mapStyles from './modules/mapStyles';
import markers from './modules/markers';
import splashScreen from './modules/splashScreen';
import trails from './modules/trails';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		layers,
		layerStyles,
		map,
		mapStyles,
		markers,
		splashScreen,
		trails,
	},
});
