module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: ['example/**/*'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'react/prop-types': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/extensions': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'import/no-unresolved': ['error', { ignore: ['react-hooks-fetch'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.ts',
          '**/*.test.tsx',
          '**/__tests__/**',
          '**/test/**',
          '**/tests/**',
          '**/jest.config.js',
          '**/jest.setup.js',
          '**/test-utils/**',
          '**/testing-library/**',
          '@testing-library/**',
        ],
      },
    ],
    camelcase: [
      'error',
      {
        properties: 'never',
        ignoreDestructuring: false,
        allow: ['first_name'],
      },
    ],
    'react/state-in-constructor': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': ['off'],
  },
};
