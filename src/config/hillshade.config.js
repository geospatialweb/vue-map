export const hillshade = {
	id: 'hillshading',
	/* index: where hillshading resides in 'outdoors-v10' style */
	index: 'waterway-river-canal-shadow',
	layer: {
		type: 'raster-dem',
		url: 'mapbox://mapbox.terrain-rgb',
	},
	source: 'dem',
	type: 'hillshade',
};
