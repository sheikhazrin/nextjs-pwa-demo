const withSass = require('@zeit/next-sass')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

module.exports = withSass({
  webpack(config, options) {
      config.plugins = config.plugins || [];

      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^https?.*/
            }
          ]
        })
      )

      return config;
  }
})