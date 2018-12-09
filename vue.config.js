module.exports = {
	devServer: {
		proxy: {
			'/data': {
				target: 'http://localhost:80',
			},
		},
	},
};
