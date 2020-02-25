const globals = require('globals')

module.exports = {
  extends: 'standard',
  plugins: ['jest', , 'node'],
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  rules: {
    'space-before-function-paren': [
      2,
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ]
  },
  overrides: [
    {
      files: ['test/*', 'test/**/*', '*.test.js'],
      rules: {
        'node/no-unpublished-require': 'off',
        'node/no-missing-require': [
          'error',
          {
            allowModules: ['worker_threads']
          }
        ]
      },
      globals: globals.jest
    },
    {
      files: ['*.test.js'],
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      rules: {
        'jest/valid-expect-in-promise': 'off',
        'jest/prefer-hooks-on-top': 'error',
        'jest/no-duplicate-hooks': 'error',
        'jest/consistent-test-it': ['error', { fn: 'it' }],
        'jest/prefer-called-with': 'error',
        'jest/no-truthy-falsy': 'error',
        'jest/lowercase-name': 'error',
        'jest/prefer-spy-on': 'error',
        'jest/expect-expect': 'off',
        'jest/valid-title': 'error',
        'jest/prefer-todo': 'error',

        'global-require': 'off'
      },
      globals: globals.jest
    }
  ]
}
