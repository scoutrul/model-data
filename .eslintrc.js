module.exports = {
	parser: 'babel-eslint',
	extends: ["eslint:recommended", "plugin:react/recommended", 'airbnb'],
	env: {
		browser: true,
		node: true
	},
	rules: {
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error",
		'react/no-danger': 'off',
		'import/no-extraneous-dependencies': 'off',
		'arrow-parens': 'off',
		'global-require': 'off',
		'spaced-comment': 'off',
		'comma-dangle': ['error', {
			arrays: 'always-multiline',
			objects: 'always-multiline',
			imports: 'always-multiline',
			exports: 'always-multiline',
			functions: 'ignore',
		}]
	},
	
	settings: {
		'import/resolver': {
			'webpack': {}
		}
	}
};
