import { defineConfig, globalIgnores } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	// 1. Ignore the output directory AND this config file (to stop the parsing error)
	globalIgnores(["out", "eslint.config.mjs"]),

	// 2. Load legacy configs (Roblox-ts, Prettier, etc.)
	...compat.extends(
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:roblox-ts/recommended-legacy",
		"plugin:prettier/recommended",
	),

	// 3. Global Settings
	{
		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2018,
			sourceType: "module",
			parserOptions: {
				jsx: true,
				useJSXTextNode: true,
				tsconfigRootDir: __dirname,
				// Note: We do NOT set 'project' here globally anymore
			},
		},
		rules: {
			"prettier/prettier": [
				"error",
				{
					bracketSpacing: true, // this controls spaces inside { }, like in constructors
					singleQuote: false,
					semi: true,
				},
			],
			"space-before-blocks": "off",
			"@typescript-eslint/brace-style": "off",
		},
	},

	// 4. Type-Aware Settings (Only for your source files)
	{
		files: ["**/*.ts", "**/*.tsx"],
		languageOptions: {
			parserOptions: {
				// This enables type-checking only for actual game files
				project: "./tsconfig.json",
			},
		},
	},
]);
