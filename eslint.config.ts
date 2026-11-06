import stylistic from '@stylistic/eslint-plugin'
import skipFormatting from 'eslint-config-prettier'
import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  { ignores: ['dist/**', 'storybook-static/**', 'node_modules/**'] },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,
  {
    rules: {
      // Style guide, priority A and B
      'vue/multi-word-component-names': 'error',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/define-props-declaration': ['error', 'type-based'],
      'vue/define-emits-declaration': ['error', 'type-literal'],
      'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
      'vue/no-unused-refs': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      // Types are imported with `import type`, so they never end up in the bundle
      '@typescript-eslint/consistent-type-imports': 'error',
      // Timings must be named constants, not numbers passed straight to a timer
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.name=/^set(Timeout|Interval)$/] > Literal[raw=/^\\d+$/]',
          message: 'Use a named constant from src/constants for timings.',
        },
        {
          selector: 'FunctionExpression',
          message: 'Use an arrow function.',
        },
      ],
      // Functions are arrow functions assigned to a const
      'func-style': ['error', 'expression'],
      'prefer-arrow-callback': 'error',
      // Every named function states what it returns. Inline callbacks get their type from the call.
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true, allowHigherOrderFunctions: false },
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.stories.ts', '.storybook/**'],
    rules: { 'no-restricted-syntax': 'off' },
  },
  {
    // Plain JS scripts can't carry type annotations; their return types are in JSDoc
    files: ['**/*.mjs'],
    rules: { '@typescript-eslint/explicit-function-return-type': 'off' },
  },
  skipFormatting,
  // After Prettier's config, which would otherwise switch `curly` off
  {
    plugins: { '@stylistic': stylistic },
    rules: {
      // Every if, else and loop body has braces
      curly: ['error', 'all'],
      // Blank lines separate steps of logic: declarations, blocks and returns stand apart
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' },
        { blankLine: 'always', prev: ['const', 'let'], next: '*' },
        { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
        { blankLine: 'always', prev: '*', next: ['multiline-const', 'multiline-let'] },
        { blankLine: 'always', prev: ['multiline-const', 'multiline-let'], next: '*' },
        { blankLine: 'always', prev: '*', next: ['if', 'for', 'while', 'switch', 'try', 'export'] },
        { blankLine: 'always', prev: 'block-like', next: '*' },
        { blankLine: 'any', prev: 'export', next: 'export' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },
)
