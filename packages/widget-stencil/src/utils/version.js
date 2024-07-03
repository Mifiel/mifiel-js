const fs = require('fs');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../../package.json');
const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
const packageJson = JSON.parse(packageJsonContent);

const { name, version } = packageJson;

const configObject = {
  appName: name,
  appVersion: version,
};

const configFilePath = path.resolve(__dirname, '../components/config.json');

fs.writeFileSync(configFilePath, JSON.stringify(configObject, null, 2), 'utf8');
