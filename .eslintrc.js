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
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-param-reassign': ['error', { props: false }],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'no-unused-expressions': ['error', { 'allowTernary': true }],
        'operator-linebreak': ['error', 'before',
            { 'overrides': { '+': 'after', '?': 'after', ':': 'after', '&&': 'after' } }],
	},
};
