// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "plugin:react-hooks/recommended"],
  plugins: [
    // ...
    "react-hooks",
  ],
  rules: {
    // ...
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
