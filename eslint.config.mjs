import globals from 'globals';
import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['**/__tests__/**'], // Ignora i file nelle cartelle __tests__
    languageOptions: {
      parser: tsParser, // Specifica il parser TypeScript
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node, // Usa il contesto Node.js se necessario
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: prettierPlugin, // Aggiunge Prettier come plugin
    },
    rules: {
      ...jsPlugin.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      'prettier/prettier': 'error', // Usa Prettier per verificare il formato
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
];
