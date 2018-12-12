import store from '../store';

const dataStore = store;

export default {
	layerStylesHash: {},

	addLayerStyles(layerStyle) {
		dataStore.addLayerStyles(layerStyle);
	},

	createLayerStylesHash() {
		dataStore.state.layerStyles.map((layerStyle, i) => {
			this.layerStylesHash[layerStyle.id] = i;
			return true;
		});
	},
};
