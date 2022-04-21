import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/Home/App'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
