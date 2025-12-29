module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "react-hooks/exhaustive-deps": "warn",
  },
  ignorePatterns: ["node_modules/", "dist/", "build/", "coverage/"],
}
