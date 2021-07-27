module.exports = {
  "**/*.json": [
    "prettier --write"
  ],
  "**/package.json": [
    "format-package -w"
  ],
  "**/*.ts*": [
    "eslint --fix-dry-run"
  ],
};
