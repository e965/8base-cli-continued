/**
 * @type {import('eslint').Linter.Config}
 */

module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:import/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['vitest'],
  env: {
    es2020: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-undef': ['error', { typeof: true }],
    'no-empty': 'warn',
    'no-useless-escape': 'warn',
    'no-case-declarations': 'off',

    'prefer-const': 'warn',

    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-types': 'off'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
