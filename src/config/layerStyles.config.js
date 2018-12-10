export const layerStyles = {
	biosphere: {
		name: 'biosphere',
		fields: 'name, description, ST_AsGeoJSON(geom)',
		layer: {
			id: 'biosphere',
			type: 'fill',
			source: {
				type: 'geojson',
			},
			layout: {
				visibility: 'visible',
			},
			paint: {
				'fill-color': '#090',
				'fill-opacity': 0.3,
				'fill-outline-color': '#000',
			},
		},
	},
	trails: {
		name: 'trails',
		fields: 'name, description, lat, lng, ST_AsGeoJSON(geom)',
		layer: {
			id: 'trails',
			type: 'line',
			source: {
				type: 'geojson',
			},
			layout: {
				visibility: 'none',
			},
			paint: {
				'line-color': '#900',
				'line-width': 2,
			},
		},
	},
};
