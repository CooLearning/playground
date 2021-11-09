module.exports = {
  extends: '@bamdadsabbagh/eslint-config',
  rules: {
    'init-declarations': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'semi',
        'requireLast': true,
      },
      'singleline': {
        'delimiter': 'semi',
        'requireLast': true,
      },
      'multilineDetection': 'brackets',
    }],
  },
};
