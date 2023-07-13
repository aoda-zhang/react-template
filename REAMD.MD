# react 最佳实践
## 项目结构说明

```ts
├─ .github
│  └─ workflows  // github action 文件，github会扫描此路径下的所有yml文件，并根据内容运行具体脚本
├─ .gitignore    	// 项目中不允许提交的code在此记录
├─ .prettierrc   // prettier格式化设置
├─ .vscode
│  └─ launch.json  // 使用vscode运行后端项目的debbuger设置
├─ README.MD
├─ tsconfig.json	// ts项目设置
├─ paths.json	// 路径别名配置
├─ craco.config.js	// 打包增量配置
├─ .cssrem	// css rem配置设置
├─ src
│  ├─ app.ts	// react 注入文件
│  ├─ index.ts	// 入口文件
│  ├─ assets // 项目静态资源文件夹文件夹
│  ├─ config	// 项目配置文件，包括不同环境下的配置config
│  ├─ pages	// 主要业务内容
│  ├─ shared			// 共享的模块
│  │  ├─ components	// 公共组件
│  │  ├─ contants	// 公共常量
│  │  ├─ libs	// 系统第三方lib
│  │  ├─ store // 公共store
│  │  ├─ styles // 公共样式
│  │  ├─ utils // 公共工具函数
│  │  ├─ typeings // 公共类型定义
│  └─ setUpProxy.js	// 开发环境proxy代理设置
```
## 打包配置增加

```ts
// craco.config.js

const path = require('path')
const sassResourcesLoader = require('craco-sass-resources-loader')   // sass全局注入配置
module.exports = {
  plugins: [
    {
      plugin: sassResourcesLoader,
      options: {
        resources: [
          './src/shared/styles/theme.scss',
          './src/shared/styles/variable.scss',
          './src/shared/styles/common.scss'
        ]
      }
    }
  ],
  webpack: {
    alias: {
      // 路径别名设置
      '@': path.resolve(__dirname, 'src'),
    }
  }
}

```



## 路径别名设置

```ts
// paths.json 
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

// tsconfig.json 扩展注入
{
 ...
  "extends": "./paths.json"
}
```



## 环境变量值设置及应用
## 路由配置

```ts
// route.js
import Welcome from '@/pages/Welcome'
import React from 'react'
import { RouteObject } from 'react-router-dom'

// 路由配置
const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Welcome />
  },
  {
    path: '/welcome',
    element: <Welcome />
  },
  {
    path: '*',
    element: <Welcome />
  }
]

export default routerList
    
 // 入口文件 app.js注入
import React from 'react'
import routeList from './route'
import { useRoutes } from 'react-router-dom'

const App: React.FC = () => {
  const router = useRoutes(routeList)
  return router
}

export default App


```



## 后端代理配置

```ts
// setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware')

/**
 * 1.可设置多个proxy代理
 * 2.此文件一定要存在src目录下，不是根目录下，本人有血的教训！！！！！
 *  */

module.exports = function (app) {
  app.use(
    // 浏览器匹配api，代理到地址后端项目地址http://172.19.5.35:9536
    createProxyMiddleware('/api', {
      target: 'http://172.19.5.35:9536',
      secure: false,
      changeOrigin: true
      // 根据具体后端项目，无api字段可直接配置为/，有api字段可不用这行处理
    })
  )
  app.use(
    // 浏览器匹配apc，代理到地址http://172.19.5.34:9531
    createProxyMiddleware('/apc', {
      target: 'http://172.19.5.34:9531',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/apc': '/'
      }
    })
  )
}

```



## 响应式配置及开发

```ts
// responsive.scss    scss响应式方法封装
// media size
$s: 375px; // mobile
$m: 768px; // ipad
$l: 1024px; // desktop
$xl: 1280px; // web

// responsive function

@mixin responsive($width-list) {
  @each $width in $width-list {
    @if $width==$s {
      // 320-767 mobile
      @media only screen and (max-width: ($m - 1px)) {
        @content;
      }
    } @else if $width==$m {
      // 768-1023 ipad
      @media only screen and (min-width: $m) and (max-width: ($l - 1px)) {
        @content;
      }
    } @else if $width==$l {
      // 1024-1279 desktop
      @media only screen and (min-width: $l) and (max-width: ($xl - 1px)) {
        @content;
      }
    } @else {
      // 1280 pc
      @media only screen and (min-width: $xl) {
        @content;
      }
    }
  }
}

// 使用方法
// mobile和ipad padding为4px
@include responsive(($s,$m)){
  padding:4px
}
```



