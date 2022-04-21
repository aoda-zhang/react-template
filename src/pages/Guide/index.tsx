import React, { useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'

const Guide: React.FC = () => {
  return (
    <>
      <div>测试子组件</div>
      <Link to="/a/a1">组件1</Link>
      <Link to="/a/a2">组件2</Link>
      <Link to="/a/a3">组件3</Link>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default Guide
