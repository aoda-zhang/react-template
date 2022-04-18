module.exports = {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier-scss'
  ],
  plugins: ['stylelint-order'],
  rules: {
    'prettier/prettier': true,
    tabWidth: 2
  }
}
