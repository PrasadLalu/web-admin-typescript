const { FlatCompat } = require("@eslint/eslintrc");
const tsParser = require("@typescript-eslint/parser");

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

module.exports = [
    {
        files: ["src/**/*.ts"],
        languageOptions: {
            parser: tsParser,
            sourceType: "module",
            ecmaVersion: "latest",
        },
        plugins: {
            "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        },
        rules: {
            indent: ["error", 4],
            quotes: ["error", "single"],
            semi: ["error", "always"],
            "linebreak-style": ["error", "unix"],
            "max-len": ["error", { "code": 108 }],
            "@typescript-eslint/no-unused-vars": "warn",
            "no-trailing-spaces": [
                "error",
                { skipBlankLines: false, ignoreComments: false },
            ],
            "no-console": ["warn", { allow: ["warn", "error"] }],
        },
    },
];