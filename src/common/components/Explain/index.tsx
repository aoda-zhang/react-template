import React from 'react'
import styles from './index.module.scss'

const Explain: React.FC = () => {
  return (
    <div className={styles.explain}>
      <div className={styles.title}>react 前端工程化说明</div>
      <ul className={styles.subTitle}>
        <li>项目结构说明</li>
        <div className={styles.text}>
          <p>
            对于开发react的同学应该都很清楚，react非常推崇模块化概念，因此，在react项目中，对于项目结构
          </p>
          <p>
            我们也基于“模块化”进行组织，我们将项目中的业务整体划分为全局模块和局部模块，全局模块存放在
          </p>
          <p>
            src/common中，其中包含assets（静态资源，如图片，公共样式，公共字体文件），components（公共组件）
          </p>
          <p>utils(公共方法),hooks(自定义hooks)</p>
          <p>目前项目结构</p>
          <div>
            <div>public</div>
            <div>
              src
              <ul>
                <li>---common // 公共模块</li>
                <li>---pages // 局部页面模块</li>
                <li>---routes // 路由配置</li>
                <li>---service // API服务配置极模块</li>
              </ul>
            </div>
            <p>---editorconfig //不同编辑器公共配置</p>
            <p>---eslint //js,ts开发规范</p>
            <p>---stylelint // css，scss样式开发规范</p>
            <p>---setupProxy // 本地开发代理</p>
            <p>---config-overriders // webpack配置</p>
          </div>
        </div>
        <li>TS集成</li>
        <div className={styles.text}>
          <p>
            当前前端三大框架，angular最先内置使用了TS，vue3和react16后也采用了TS编写，因此我们的工程化脚手架
          </p>
          <p>全面拥抱TS，对于TS更详细的配置，可以到根目录下的tsconfig.json进行配置</p>
        </div>

        <li>TS开发规范</li>
        <div className={styles.text}>
          <p>
            关于TS开发规范的要求，目前使用最多的便是airbnb的ts规范，目前对于js，ts开发规范使用量最多的便是eslint
          </p>

          <p>
            我们的脚手架已集成了airbnb的ts开发规范，具体详细配置，请到根目录下的eslitrc.js进行配置。
          </p>
        </div>
        <li>CSS-SCSS开发规范</li>
        <li>git提交规范</li>
        <li>webpack配置</li>
        <li>本地开发proxy代理</li>
      </ul>
    </div>
  )
}

export default Explain
