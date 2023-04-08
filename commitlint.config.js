module.exports = {
	extends: ['@commitlint/config-conventional'],
	rules: {
		'body-full-stop': [0, 'always'],
		'subject-full-stop': [0, 'always'],
		'header-full-stop': [0, 'always'],
	},
};
