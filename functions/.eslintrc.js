module.exports = {
  env: {
    es6: true,
    mocha: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 2020 },
  globals: {},
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: [
    'mocha',
    'chai-expect',
    '@typescript-eslint',
  ],
  rules: {
    'object-curly-spacing': ['error', 'always', { objectsInObjects: false }],
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
    'prefer-arrow-callback': 'off',
    'mocha/no-exclusive-tests': 'error',
    'mocha/no-mocha-arrows': 'error',
    'mocha/handle-done-callback': 'error',
    'mocha/no-top-level-hooks': 'error',
    'chai-expect/missing-assertion': 'error',
    'chai-expect/no-inner-compare': 'error',
    'chai-expect/terminating-properties': 'error',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'error',
  },
};
