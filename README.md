# Demo purpose

The project has both Jest and ESLint properly configured with comprehensive setups:

- Jest is configured with TypeScript support, code coverage reporting (threshold 80%), and custom test environment
- ESLint is set up with TypeScript and Prettier integration, including necessary plugins and configurations

## Project overview and purpose

The project purpose is to study Effect library and integrate in a NodeJS example with ExpressJS.

## PNPM

This project use _pnpm_ instead of _npm_ for disk usage benefit.

```bash
pnpm install
```

### How to install JEST

```bash
pnpm install --save-dev jest ts-jest @types/jest
```

Create a `jest.config.js`:

```js
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
};
```

### How to install ESLint and Prettier

```bash
pnpm install --save-dev  eslint prettier
pnpm install --save-dev  typescript-eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser @eslint/js eslint-plugin-prettier eslint-config-prettier
```

create a `eslint.config.mjs`:

```js
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
```

create a `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

### How to install Husky

```bash
pnpm install --save-dev husky
npx husky init
npx husky add .husky/pre-push "npm test"
npx husky add .husky/pre-commit "npm test"
```
