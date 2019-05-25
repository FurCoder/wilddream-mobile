import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import moment from 'moment'

import HomePage from '@page/HomePage'
import LoginPage from '@page/LoginPage'
import ArtDetail from '@page/ArtDetailPage'

import 'antd-mobile/dist/antd-mobile.css'
import '@style/index.styl'

moment.locale('zh-cn')

render(
  <Router>
    <div className='full-size'>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route path="/art-detail/:userid/:artworkid" component={ArtDetail} />
    </div>
  </Router>,
  document.getElementById('root')
)
