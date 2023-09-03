import React, { Suspense, lazy } from 'react'
const Welcome_lazy = lazy(() => import('@/pages/Welcome'))
import { RouteObject } from 'react-router-dom'

const routerList: RouteObject[] = [
  {
    path: '/',
    element: (
      // 使用Suspense包裹，使用lazy导入，react路由懒加载方式
      <Suspense fallback={<div>loading</div>}>
        <Welcome_lazy />
      </Suspense>
    )
  },
  {
    path: '/welcome',
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Welcome_lazy />
      </Suspense>
    )
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<div>loading</div>}>
        <Welcome_lazy />
      </Suspense>
    )
  }
]

export default routerList
