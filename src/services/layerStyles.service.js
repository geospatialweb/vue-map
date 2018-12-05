'use strict';

export const layerStylesService =
{
	layerStyles: [],
	layerStylesHash: {},

	createLayerStylesHash()
	{
		this.layerStyles.map((layerStyle, i) =>
			this.layerStylesHash[layerStyle.id] = i
		);
	},

	pushLayerStyle(layerStyle)
	{
		this.layerStyles.push(layerStyle);
	}
};
