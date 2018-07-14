module.exports = {
  staticFileGlobs: [
    'manifest.json',
    'src/**/*',
    'node_modules/**/.js'
  ],
  runtimeCaching: [
    {
      urlPattern: /\/@webcomponents\/webcomponentsjs\//,
      handler: 'fastest'
    },
    {
      urlPattern: /^https:\/\/fonts.gstatic.com\//,
      handler: 'fastest'
    }
  ]
};
