var path = require('path');
var useDefaultConfig = require('@ionic/app-scripts/config/optimization.config.js');

module.exports = function () {
  let envExt = process.env.IONIC_ENV === 'dev' ? '' : `.${process.env.IONIC_ENV}`;

  useDefaultConfig.resolve.alias = {
    "@fma_app/env": path.resolve(`./src/environments/environment${envExt}.ts`)
  };

  return useDefaultConfig;
};
