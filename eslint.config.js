import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/**', 'node_modules/**'] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}', 'scripts/**/*.ts', 'build.ts'],
    languageOptions: {
      globals: {
        Bun: 'readonly',
        console: 'readonly',
        document: 'readonly',
        process: 'readonly',
        structuredClone: 'readonly',
        URL: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
);
