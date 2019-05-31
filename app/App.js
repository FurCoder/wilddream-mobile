import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import NotLiveRoute from "react-live-route"
import moment from 'moment'
import HomePage from '@page/HomePage'
import LoginPage from '@page/LoginPage'
import ArtDetail from '@page/ArtDetailPage'
import UserPage from '@page/UserPage'

import 'antd-mobile/dist/antd-mobile.css'
import '@style/index.styl'

const LiveRoute = withRouter(NotLiveRoute)
moment.locale('zh-cn')

render(
  <Router>
    <div className='full-size'>
      <LiveRoute exact alwaysLive path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <Route path="/art-detail/:userid/:artworkid" component={ArtDetail} />
      <Route path="/user/:userpagename" component={UserPage} />
    </div>
  </Router>,
  document.getElementById('root')
)
