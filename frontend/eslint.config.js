import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            'eqeqeq': ['error', 'always'],
            'quotes': ['error', 'single', { avoidEscape: true }],
            'semi': ['error', 'never'],
            'indent': ['error', 4],
            'no-console': 'warn',
            'no-undef': 'error',
            'no-debugger': 'error',
            'curly': ['error', 'all'],
            'consistent-return': 'error',
            'prefer-const': 'error',
            'no-multiple-empty-lines': ['error', { max: 1 }],
            'spaced-comment': ['error', 'always', { exceptions: ['-', '+'] }],
        },
    }
)
