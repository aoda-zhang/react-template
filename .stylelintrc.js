module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-rational-order'],
  customSyntax: 'postcss-scss',
  plugins: ['stylelint-scss'],
  rules: {
    indentation: 2,
    'no-missing-end-of-source-newline': null,
    'max-nesting-depth': 3,
    'selector-max-compound-selectors': 3,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'selector-class-pattern': null,
    'string-quotes': 'single',
    'at-rule-empty-line-before': null,
    'at-rule-no-unknown': null,
    'at-rule-name-case': 'lower',
    'length-zero-no-unit': true,
    'shorthand-property-no-redundant-values': true,
    'number-leading-zero': 'never',
    'declaration-block-no-duplicate-properties': true,
    'no-descending-specificity': true,
    'selector-max-id': 0,
    'max-nesting-depth': 3,
    indentation: [
      2,
      {
        severity: 'warning'
      }
    ]
  }
}
