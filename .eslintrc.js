module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier",
    "prettier/vue",
  ],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: "module"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "vue/max-attributes-per-line": [
      2,
      {
        multiline: {
          allowFirstLine: true
        }
      }
    ],
    quotes: ["error", "double"],
    "max-len": ["error", {code: 140, ignoreStrings: true, ignoreUrls: true}],
    "import/no-unresolved": 0,
    "linebreak-style": 0,
    "comma-dangle": 0,
    "import/prefer-default-export": 0,
    "no-unused-expressions": ["error", {allowTernary: true}],
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "arrow-parens": ["error", "as-needed"],
    "object-curly-newline": ["error", {ObjectPattern: "never"}],
    "import/extensions": ["error", "never"],
    "implicit-arrow-linebreak": ["error", "beside"],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "never"
      }
    ]
  },
  plugins: ["vue"],
}
