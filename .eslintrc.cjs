/* eslint-disable max-len */
/**
 * This is intended to be a basic starting point for linting in your app.
 * It relies on recommended configs out of the box for simplicity, but you can
 * and should modify this configuration to best suit your team's needs.
 */

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
  },
  ignorePatterns: ['!**/.server', '!**/.client'],

  // Base config
  extends: ['eslint:recommended'],
  plugins: ['simple-import-sort', 'unused-imports'],

  overrides: [
    // React
    {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: ['react', 'jsx-a11y'],
      extends: [
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        formComponents: ['Form'],
        linkComponents: [{ name: 'Link', linkAttribute: 'to' }, { name: 'NavLink', linkAttribute: 'to' }],
        'import/resolver': {
          typescript: {},
        },
      },
    },

    // Typescript
    {
      files: ['**/*.{ts,tsx}'],
      plugins: ['@typescript-eslint', 'import'],
      parser: '@typescript-eslint/parser',
      settings: {
        'import/internal-regex': '^~/',
        'import/resolver': {
          node: {
            extensions: ['.ts', '.tsx'],
          },
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
    },

    // Node
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
    },
  ],

  rules: {
    'indent': [
      'error',
      2,
      { SwitchCase: 1 },
    ],
    'no-console': [
      'warn',
      {
        allow: [
          'info',
          'warn',
          'error',
          'test',
        ],
      },
    ],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'max-len': [
      'warn',
      {
        code: 100,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
      },
    ],
    'jsx-quotes': ['error', 'prefer-double'],
    'array-bracket-spacing': ['error', 'never'],
    'array-bracket-newline': ['error', { multiline: true, minItems: 3 }],
    'array-element-newline': ['error', { multiline: true, minItems: 3 }],
    'array-callback-return': 'error',
    'object-shorthand': ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],
    'object-curly-newline': [
      'error',
      {
        ObjectPattern: { multiline: true, minProperties: 3 },
        ImportDeclaration: { multiline: true, minProperties: 4 },
        ExportDeclaration: { multiline: true, minProperties: 4 },
      },
    ],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-nested-ternary': 'error',
    'no-unneeded-ternary': 'error',
    'arrow-spacing': 'error',
    'switch-colon-spacing': 'error',
    'block-spacing': 'error',
    'template-curly-spacing': ['error', 'never'],
    'semi-spacing': ['error', { before: false, after: true }],
    'computed-property-spacing': ['error', 'never'],
    'keyword-spacing': ['error', { before: true, after: true }],
    'func-call-spacing': ['error', 'never'],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: [
          'block',
          'block-like',
          'iife',
          'class',
          'multiline-expression',
          'multiline-const',
          'multiline-let',
          'multiline-var',
        ],
      },
      {
        blankLine: 'any',
        prev: ['case', 'default'],
        next: [
          'block',
          'block-like',
          'iife',
          'class',
          'multiline-expression',
          'multiline-const',
          'multiline-let',
          'multiline-var',
        ],
      },
      {
        blankLine: 'always',
        prev: 'directive',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'directive',
        next: 'directive',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'export',
      },
      {
        blankLine: 'any',
        prev: 'export',
        next: 'export',
      },
    ],
    'react/boolean-prop-naming': 'warn',
    'react/jsx-max-props-per-line': ['error', { maximum: 1 }],
    'react/jsx-closing-tag-location': 'error',
    'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
    'react/jsx-pascal-case': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-key': 'warn',
    'react/self-closing-comp': 'error',
    'react/jsx-curly-spacing': ['error', { when: 'never', children: true }],
    'react/jsx-curly-newline': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-equals-spacing': 'error',
    'react/jsx-fragments': 'error',
    'react/jsx-indent': [
      'error',
      2,
      { 'indentLogicalExpressions': false },
    ],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-one-expression-per-line': ['error', { allow: 'single-child' }],
    'react/jsx-props-no-multi-spaces': 'error',
    'react/jsx-space-before-closing': 'error',
    'react/jsx-tag-spacing': ['error', { beforeSelfClosing: 'always' }],
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never',
        propElementValues: 'always',
      },
    ],
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      },
    ],
  },
};
