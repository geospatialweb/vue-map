import store from '../store';

export default {
	layerStylesHash: {},

	addLayerStyle(layerStyle) {
		store.addLayerStyle(layerStyle);
	},

	createLayerStylesHash() {
		store.state.layerStyles.map((layerStyle, i) => {
			this.layerStylesHash[layerStyle.id] = i;
			return true;
		});
	},
};
