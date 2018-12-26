module.exports = {
	devServer: {
		proxy: {
			'/api/geojson': {
				target: 'http://localhost',
			},
		},
	},
};
