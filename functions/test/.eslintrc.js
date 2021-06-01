module.exports = {
  env: {
    es6: true,
    mocha: true,
  },
  globals: {},
  extends: 'airbnb-base',
  plugins: [
    '@typescript-eslint',
    'mocha',
    'chai-expect',
  ],
  rules: {
    'arrow-parens': [
      'error',
      'as-needed',
      {
        requireForBlockBody: true,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-unused-expressions': 'off',
    'func-names': 'off',
    'import/no-unresolved': 'off',
    'prefer-arrow-callback': 'off',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-mocha-arrows': 'error',
    'mocha/handle-done-callback': 'error',
    'mocha/no-top-level-hooks': 'error',
    'chai-expect/missing-assertion': 'error',
    'chai-expect/no-inner-compare': 'error',
    'chai-expect/terminating-properties': 'error',
    quotes: ['error', 'single'],
    'import/extensions': 'off',
  },
};
