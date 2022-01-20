module.exports = {
  env: {
    browser: true,
    commonjs: true
  },
  extends: ['plugin:json/recommended', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'es5', 'prettier', 'html'],
  parserOptions: {
    ecmaVersion: 6
  },
  rules: {
    'prettier/prettier': 'error'
  },
  overrides: [
    {
      files: ['**/*.{html,js,ts}']
    }
  ]
};
