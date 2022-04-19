# react 前端工程化说明

## 项目结构说明

- 对于开发 react 的同学应该都很清楚，react 非常推崇模块化概念，因此，在 react 项目中，对于项目结构我们也基于“模块化”进行组织，我们将项目中的业务整体划分为全局模块和局部模块，全局模块存放在 src/common 中，其中包含 assets（静态资源，如图片，公共样式，公共字体文件），components（公共组件，utils(公共方法),hooks(自定义 hooks)
- 目前项目结构

## TS 集成

- 当前前端三大框架，angular 最先内置使用了 TS，vue3 和 react16 后也采用了 TS 编写，因此我们的工程化脚手架全面拥抱 TS，对于 TS 更详细的配置，可以到根目录下的 tsconfig.json 进行配置

## TS 开发规范

- 关于 TS 开发规范的要求，目前使用最多的便是 airbnb 的 ts 规范，目前对于 js，ts 开发规范使用量最多的便是 eslint，我们的脚手架已集成了 airbnb 的 ts 开发规范，具体详细配置，请到根目录下的 eslitrc.js 进行配置。

## CSS-SCSS 开发规范

## git 提交规范

## webpack 配置

## 本地开发 proxy 代理
