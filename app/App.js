import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from '@page/HomePage'

import '@style/index.styl'

render(
  <Router>
    <div className='full-size'>
      <Route exact path="/" component={HomePage} />
    </div>
  </Router>,
  document.getElementById('root')
)
