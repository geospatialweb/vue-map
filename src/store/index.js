import Vue from 'vue';
import Vuex from 'vuex';
import layers from './modules/layers';
import layerStyles from './modules/layerStyles';
import mapSettings from './modules/mapSettings';
import mapStyles from './modules/mapStyles';
import markers from './modules/markers';
import splashScreen from './modules/splashScreen';
import trails from './modules/trails';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		layers,
		layerStyles,
		mapSettings,
		mapStyles,
		markers,
		splashScreen,
		trails,
	},
});
