module.exports = {
	extends: [
		"eslint:recommended",
		"next",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
	],
	parser: "@typescript-eslint/parser",
	rules: {
		// Common
		"no-console": "warn",
		// React
		"react/prop-types": "off",
		"react/display-name": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-curly-spacing": "off",
		"react/no-unknown-property": "off",
		// TypeScript
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-namespace": "off",
		"@typescript-eslint/no-explicit-any": "warn",
		semi: "off",
	},
	overrides: [],
}
