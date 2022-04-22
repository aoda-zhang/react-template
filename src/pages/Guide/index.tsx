import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Guide: React.FC = () => {
  return (
    <>
      <div>测试子组件</div>
      <Link to="/guide/page1">page1页面</Link>
      <Link to="/guide/page2">page2页面</Link>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Guide
