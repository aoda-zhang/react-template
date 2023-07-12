import Welcome from '@/pages/Welcome'
import React from 'react'
import { RouteObject } from 'react-router-dom'

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
