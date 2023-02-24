module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true // jest
  },
  extends: [
    'standard',
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',  
  },
  plugins: [
    '@typescript-eslint',  // For TypeScript.
    'jest' // jest
  ],
  overrides: [ // Use `overrides` so ESLint can check both JS and TS files.
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended', 
        'plugin:@typescript-eslint/recommended-requiring-type-checking',   
      ],
      parserOptions: {
        // tsconfigRootDir: __dirname,  
        // project: ['./tsconfig.json'],  
        parser: '@typescript-eslint/parser',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    /* jest */
    {
      "files": ["test/**"],
      "plugins": ["jest"],
      "extends": ["plugin:jest/recommended"],
      "rules": { "jest/prefer-expect-assertions": "off" }
    }
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    quotes: ["error", "double"],  // Use double quotes.
    semi: ["error", "always"],  // Always add a semicolon at the end statements.
    indent: ["error", 2],  // Indentation is two spaces.
    "no-console": "error",  // Avoid using methods on `console` in the code.
    /* jest */
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error"
  }
}
