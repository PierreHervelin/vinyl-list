import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import stylelintPrettierRecommended from 'stylelint-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], plugins: { js }, extends: ['js/recommended'] },
    tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    reactHooks.configs.recommended,
    reactRefresh.configs.recommended,
    eslintConfigPrettier,
    stylelintPrettierRecommended,
    eslintPluginPrettierRecommended,
]);
