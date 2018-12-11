export default {
	layerStyles: [],
	layerStylesHash: {},

	createLayerStylesHash() {
		this.layerStyles.map((layerStyle, i) => {
			this.layerStylesHash[layerStyle.id] = i;
			return true;
		});
	},

	pushLayerStyle(layerStyle) {
		this.layerStyles.push(layerStyle);
	},
};
