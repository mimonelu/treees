module.exports = {
  chainWebpack (config) {
    config.module
      .rule('text')
      .test(/\.txt$/i)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  },
  outputDir: 'docs',
  productionSourceMap: false,
  publicPath: './',
}
