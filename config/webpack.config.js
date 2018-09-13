
const chalk = require("chalk");
const fs = require('fs');
const path = require('path');
const useDefaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

const env = process.env.IONIC_ENV;

console.log(chalk.red(`\nIONIC_ENV = ${ env }\n`))

if (env === 'prod' || env === 'dev') {

  useDefaultConfig[env].resolve.alias = {
    "@fma_app": path.resolve('./src/app/'),
    "@fma_assets": path.resolve('./src/assets/'),
    "@fma_env": path.resolve(environmentPath()),
    "@fma_pages": path.resolve('./src/pages/'),
    "@fma_providers": path.resolve('./src/providers/'),
    "@fma_components": path.resolve('./src/components/'),
    "@fma_tests": path.resolve('./src/'),
    "@fma_theme": path.resolve('./src/theme/')
  };

} else {

  // Default to dev config
  useDefaultConfig[env] = useDefaultConfig.dev;
  useDefaultConfig[env].resolve.alias = {
    "@fma_app": path.resolve('./src/app/'),
    "@fma_assets": path.resolve('./src/assets/'),
    "@fma_env": path.resolve(environmentPath()),
    "@fma_pages": path.resolve('./src/pages/'),
    "@fma_providers": path.resolve('./src/providers/'),
    "@fma_components": path.resolve('./src/components/'),
    "@fma_tests": path.resolve('./src/'),
    "@fma_theme": path.resolve('./src/theme/')
  };

}

function environmentPath() {
  let envExt = env === 'dev' ? '' : `.${env}`;
  let filePath = `./src/environments/environment${envExt}.ts`;

  if (!fs.existsSync(filePath)) {
    console.log(chalk.red('\n' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = function () {
  return useDefaultConfig;
};
