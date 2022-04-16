/**
 * webpack打包相关在此配置
 */
const {
  override,
  addWebpackAlias,
  adjustStyleLoaders,
  addWebpackPlugin
} = require('customize-cra')

const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const resolve = dir => path.join(__dirname, '.', dir)
const isPrd = process.env.NODE_ENV === 'production'
module.exports = override(
  addWebpackAlias({
    '@': resolve('src')
  }),
  // scss全局样式动态挂载
  adjustStyleLoaders(rule => {
    if (rule.test.toString().includes('scss')) {
      rule.use.push({
        loader: require.resolve('sass-resources-loader'),
        options: {
          resources: [
            './src/common/assets/style/theme.scss',
            './src/common/assets/style/variable.scss',
            './src/common/assets/style/common.scss'
          ]
        }
      })
    }
  }),
  isPrd &&
    addWebpackPlugin(
      new UglifyJsPlugin({
        cache: false,
        parallel: true,
        uglifyOptions: {
          warnings: false,
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    ),
  (config, env) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src')
    }
    return config
  }
)
