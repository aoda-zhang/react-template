import React from 'react'
import ReactDOM from 'react-dom'
import App from './pages/Home/App'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App></App>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
