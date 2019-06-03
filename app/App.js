import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import NotLiveRoute from 'react-live-route'
import moment from 'moment'
import HomePage from '@page/HomePage'
import LoginPage from '@page/LoginPage'
import ArtDetail from '@page/ArtDetailPage'
import UserPage from '@page/UserPage'
import ActivePage from '@page/ActivePage'
import JournalDetailPage from '@page/JournalDetailPage'
import { checkLogin, getLocalLoginInfo} from '@util/api'

import 'antd-mobile/dist/antd-mobile.css'
import '@style/index.styl'

const LiveRoute = withRouter(NotLiveRoute)
moment.locale('zh-cn')

const main = () => {
  render(
    <Router>
      <div className='full-size'>
        <LiveRoute exact alwaysLive path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <LiveRoute exact alwaysLive path="/active" component={ActivePage} />
        <Route path="/art-detail/:userid/:artworkid" component={props => <ArtDetail key={props.match.params.artworkid} {...props}/>} />
        <Route path="/user/:userpagename" component={props => <UserPage key={props.match.params.userpagename} {...props}/>} />
        <Route path="/journal-detail/:userid/:journalid"  component={props => <JournalDetailPage key={props.match.params.journalid} {...props}/>} />
      </div>
    </Router>,
    document.getElementById('root')
  )
}

main()