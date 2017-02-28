const SVGO = require('svgo');
const loaderUtils = require('loader-utils');

const defaultSvgoConfig = {
  plugins: [
    { removeDimensions: true },
    { removeXMLNS: true },
  ],
};

module.exports = function(source) {
  const callback = this.async();

  if (!callback) {
    return source;
  }

  const queryOptions = loaderUtils.getOptions(this);
  const svgoConfig = Object.assign(
    {},
    defaultSvgoConfig,
    queryOptions
  );

  const svgo = new SVGO(svgoConfig);

  svgo.optimize(source, result => {
    callback(null, `module.exports = ${JSON.stringify(result.data)}`);
  });
};
