import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from '@page/HomePage'
import LoginPage from '@page/LoginPage'

import 'antd-mobile/dist/antd-mobile.css'
import '@style/index.styl'

render(
  <Router>
    <div className='full-size'>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
    </div>
  </Router>,
  document.getElementById('root')
)
