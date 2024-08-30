/* eslint-disable */
module.exports = {
  'env': {
      'browser': true,
      'es2021': true
  },
  'extends': [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
      'ecmaVersion': 12,
      'sourceType': 'module'
  },
  'plugins': [
      '@typescript-eslint'
  ],
  'rules': {
      'quotes': ['error', 'single'],
      'semi': [
          'error',
          'always'
      ],
      'curly': ['error', 'multi-line', 'consistent'],
      'brace-style': ['error', '1tbs', { 'allowSingleLine': false }],
      'eqeqeq': 'error',
      'prefer-const': ['warn'],
      'no-case-declarations': ['off'],
      'no-lonely-if': 'warn',
      'no-eval': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-this-alias': ['off'],
      '@typescript-eslint/no-empty-function': ['off'],
      '@typescript-eslint/explicit-function-return-type': ['warn'],
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/typedef': [ // types have to be declared
          'warn', {
              'arrayDestructuring': true,
              'arrowParameter': true,
              'memberVariableDeclaration': true,
              'objectDestructuring': true,
              'parameter': true,
              'propertyDeclaration': true,
              'variableDeclaration': true,
          }
      ],
      '@typescript-eslint/prefer-optional-chain': ['warn'],
      '@typescript-eslint/prefer-nullish-coalescing': ['warn'],
      '@typescript-eslint/no-base-to-string': ['warn']
  }
};
