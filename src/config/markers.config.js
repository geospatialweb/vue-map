export default {
	office: {
		name: 'office',
		fields: 'name, description, ST_AsGeoJSON(geom)',
		hidden: false,
		state: {
			active: 'active',
			inactive: 'inactive',
		},
	},
	places: {
		name: 'places',
		fields: 'name, description, ST_AsGeoJSON(geom)',
		hidden: false,
		state: {
			active: 'active',
			inactive: 'inactive',
		},
	},
	trails: {
		name: 'trails',
		fields: 'name, description, lat, lng, ST_AsGeoJSON(geom)',
		hidden: false,
		state: {
			active: 'active',
			inactive: 'inactive',
		},
	},
};
