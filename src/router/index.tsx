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
