module.exports = {
  env: {
    'react-native/react-native': true,
    es6: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'react-native', 'prettier'],
  rules: {},
};
