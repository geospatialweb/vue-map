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
		'linebreak-style': ['error', 'windows'],
		'no-console': 'off',
		'no-debugger': 'off',
		'no-param-reassign': ['error', { props: false }],
		'no-shadow': ['error', { allow: ['state'] }],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-underscore-dangle': 'off',
		'no-unused-expressions': ['error', { allowTernary: true }],
		'operator-linebreak': ['error', 'before',
			{
				overrides: {
					'+': 'after', '?': 'after', ':': 'after', '&&': 'after', '||': 'after',
				},
			}],
	},
};
