const { CLIEngine } = require("eslint");

const cli = new CLIEngine({});

module.exports = {
  "*.{js,jsx,ts,tsx}": (files) => [
    "prettier --write 'src/**/*.{js,jsx,ts,tsx}'",
    "eslint --fix --max-warnings=0 'src/**/*.{js,jsx,ts,tsx}' " +
    files.filter((file) => !cli.isPathIgnored(file)).join(" ")
  ],
};
