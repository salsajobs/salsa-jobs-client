export default (config, env, helpers) => {
  // Override <title> in the html template
  const { plugin } = helpers.getPluginsByName(config, 'HtmlWebpackPlugin')[0]
  plugin.options.title = 'nsjobs'
}
