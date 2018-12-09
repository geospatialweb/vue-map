module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'@vue/airbnb',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		indent: ['error', 'tab'],
		'import/prefer-default-export': false,
		'linebreak-style': ['error', 'windows'],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-param-reassign': ['error', { props: false }],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-underscore-dangle': 'off',
	},
};
