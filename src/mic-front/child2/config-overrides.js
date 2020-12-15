module.exports = {
  webpack: function(config, env) {
    // ...add your webpack config
    config.output.library = 'reactApp2'
    config.output.libraryTarget = 'umd'
    config.output.publicPath = 'http://localhost:8888'
    config.output.filename = 'reactApp2.js'
    config.output.jsonpFunction = `webpackJsonp_reactApp2`
    /* 
    filename: 'single-spa-react-app.js',
    library: 'singleSpaReactApp',
      libraryTarget: 'umd',
      filename: 'single-spa-react-app.js' */
    return config;
  },
  // Extend/override the dev server configuration used by CRA
  // See: https://github.com/timarney/react-app-rewired#extended-configuration-options
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      // Default config: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpackDevServer.config.js
      const config = configFunction(proxy, allowedHost);
      config.port = 9999
      // Set loose allow origin header to prevent CORS issues
      config.headers = {'Access-Control-Allow-Origin': '*'}

      return config;
    };
  },
};
