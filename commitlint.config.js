module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "header-max-length": [2, "always", 170],
    "body-max-line-length": [2, "always", 170],
  },
};
