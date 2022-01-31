import React, { useState, useEffect, useContext } from 'react'
import FastClick from 'fastclick'
import { render } from 'react-dom'
import { HashRouter as Router, Route, withRouter } from 'react-router-dom'
import { __RouterContext } from 'react-router'
import NotLiveRoute from 'react-live-route'
import moment from 'moment'
import HomePage from '@page/HomePage'
import LoginPage from '@page/LoginPage'
import ArtDetail from '@page/ArtDetailPage'
import UserPage from '@page/UserPage'
import ActivePage from '@page/ActivePage'
import JournalDetailPage from '@page/JournalDetailPage'
import MyPage from '@page/MyPage'
import EditProfilePage from '@page/EditProfilePage'
import { checkLogin, getLocalLoginInfo} from '@util/api'
import 'antd/dist/antd.css'

import 'antd-mobile/dist/antd-mobile.css'
import '@style/index.styl'

const LiveRoute = withRouter(NotLiveRoute)
moment.locale('zh-cn')

FastClick.attach(document.body)

const app = document.body

const historyStatus = {
  pathname: null
}


const DummySwipe = (props) => {
  const route = useContext(__RouterContext)
  historyStatus.pathname = route.history.location.pathname
  return <div></div>
}

const main = () => {
  render(
    <Router>
      <div className='full-size'>
        <DummySwipe />
        <LiveRoute exact alwaysLive path="/" component={HomePage} />
        <LiveRoute exact alwaysLive path="/active" component={ActivePage} forceUnmount={(props, params)=> props.pathname === '/login' } />
        <LiveRoute exact livePath={['/', '/active']} path="/my" component={MyPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/edit-profile" component={EditProfilePage} />
        <Route path="/art-detail/:userid/:artworkid" component={props => <ArtDetail key={props.match.params.artworkid} {...props}/>} />
        <Route path="/user/:userpagename" component={props => <UserPage key={props.match.params.userpagename} {...props}/>} />
        <Route path="/journal-detail/:userid/:journalid"  component={props => <JournalDetailPage key={props.match.params.journalid} {...props}/>} />
      </div>
    </Router>,
    document.getElementById('root')
  )
}

main()