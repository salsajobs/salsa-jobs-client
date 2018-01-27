import { DefinePlugin } from 'webpack'
const { API_URL } = process.env

module.exports = function (config) {
  config.plugins.push(
      new DefinePlugin({
        'process.env.API_URL': API_URL || 'https://localhost:3000',
      })
  )
}
