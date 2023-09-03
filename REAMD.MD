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
import React from 'react'
import { RouteObject } from 'react-router-dom'
import Loadable from 'react-loadable'
// 懒加载效果组件
const LoadingTip = () => <div>加载路由ing...</div>
const loadLazyComponent = lazyComponent => {
  return Loadable({
    loader: lazyComponent,
    loading: LoadingTip
  })
}
const routerList: RouteObject[] = [
  {
    path: '/',
    element: loadLazyComponent(() => import('@/pages/Welcome'))
  },
  {
    path: '/welcome',
    element: loadLazyComponent(() => import('@/pages/Welcome'))
  },
  {
    path: '*',
    element: loadLazyComponent(() => import('@/pages/Welcome'))
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



## 前端状态应用
> 当前端多个页面需要使用同一份数据，而多个页面之间层次嵌套很深，或者页面之间不存在强关联时，往往会使用redux或者mobx做临时的数据状态管理，这里以mobx为例

```ts
// store实例创建和方法定义
import { makeAutoObservable } from 'mobx'
class FareStore {
  // 状态
  faredData = []
  formData = []
  faredDate: string[] = []
  repeatAddress: string[] = []
  constructor() {
    // mobx自动检测，状态，action和computed，绑定到实例上
    makeAutoObservable(this)
  }
  setForm = (data = []) => {
    this.faredData = [...this.faredData, ...data]
    this.formData = [...data]
  }
  // computed，mobx会将get为修饰符的方法定义为计算属性
  get getFaredAddress() {
    return this.faredData?.map(item => item?.to) ?? []
  }
  // action
  setDate = (date: string) => {
    this.faredDate = [...this.faredDate, date]
  }
}
const fareStore = new FareStore()
export default fareStore


// mobx状态使用
// demo.js
import fareStore from '../store'
const { faredDate, getFaredAddress, getRepeatAddress } = fareStore
function Demo(){
  return (
    <div>
          {getFaredAddress?.map((item, i) => (
            <span key={i} className={styles.val}>
              {item}
            </span>
          ))}
    </div>
  )
}

```