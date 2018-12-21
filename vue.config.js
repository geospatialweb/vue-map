module.exports = {
	devServer: {
		proxy: {
			'/geojson': {
				target: 'http://localhost',
			},
		},
	},
};
