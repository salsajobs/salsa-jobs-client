import { DefinePlugin } from 'webpack'

module.exports = function (config) {
  config.plugins.push(
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL) || 'https://localhost:3000',
    })
  )
}
