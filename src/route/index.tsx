import React from 'react'
import { RouteObject } from 'react-router-dom'
import Guide from 'src/pages/Guide'
import Explain from '../common/components/Explain'

const routerList: RouteObject[] = [
  {
    path: '/',
    element: <Explain />
  },
  {
    path: 'a',
    element: <Guide></Guide>,
    children: [
      {
        path: '/a/a1',
        element: <div>子组件展示1</div>
      },
      {
        path: '/a/a2',
        element: <div>子组件展示2</div>
      },
      {
        path: '/a/a3',
        element: <div>子组件展示3</div>
      }
    ]
  },
  {
    path: '/b',
    element: <div>4444</div>
  }
]

export default routerList
