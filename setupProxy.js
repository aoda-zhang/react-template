const proxy = require('http-proxy-middleware')
// 匹配多个接口的代理

module.exports = function (app) {
  app.use(
    // 浏览器匹配api，代理到地址http://172.19.5.35:9536
    proxy('/api', {
      target: 'http://172.19.5.35:9536',
      secure: false,
      changeOrigin: true,
      // 根据具体后端项目，无api字段可直接配置为/，有api字段可不用这行处理
      pathRewrite: {
        '^/api': '/'
      }
    })
  )
  app.use(
    // 浏览器匹配apc，代理到地址http://172.19.5.34:9531
    proxy('/apc', {
      target: 'http://172.19.5.34:9531',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/apc': '/'
      }
    })
  )
}
