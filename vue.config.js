module.exports = {
	devServer: {
		proxy: {
			'/geojson': {
				target: 'http://localhost:3000',
			},
		},
	},
};
