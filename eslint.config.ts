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
      ],
    },
  },
  {
    files: ['**/*.test.ts', '**/*.stories.ts', '.storybook/**'],
    rules: { 'no-restricted-syntax': 'off' },
  },
  skipFormatting,
)
