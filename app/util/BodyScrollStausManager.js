import React, { Component } from 'react'
import topic from '@util/topic'

export default function BodyScrollStausManager (activePx = 100, startScrollTop = 300) {
  return Target => {
    class _ extends Component {
      lock = false
      constructor() {
        super()
        this.init_topics()
        this.state = {
          scrollTop: 0
        }
      }
      init_topics() {
        this.topic = topic()
        this.scrollActiveTopic = topic()
      }
      _scroll = () => {
        const { scrollHeight } = document.body
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        const clientHeight = document.documentElement.clientHeight
        this.setState({
          scrollTop
        })
        if ( scrollTop >= startScrollTop) {
          this.scrollActiveTopic.dispatch({
            action: 'ACTIVE',
            scrollTop,
          })
        }
        if (this.lock) {
          return null
        }
        if (scrollHeight === clientHeight) {
          return null
        }
        if (clientHeight + scrollTop + activePx >= scrollHeight) {
          this.lock = true
          this.topic.dispatch({
            action: 'LOAD_MORE'
          })
          this.lockedScrollTop = scrollTop
        }
      }
      unLock = (scrollToLock = true) => {
        this.lock = false
      }
      componentDidMount() {
        document.addEventListener('scroll', this._scroll)
        this.unlinsten = () => document.addEventListener('scroll', this._scroll)
      }
      componentWillUnmount() {
        this.unlinsten()
        document.removeEventListener('scroll', this._scroll)
      }
      changeLock = status => {
        this.lock = status
      }
      scrollToTop = () => {
        window.scrollTo(0, 0)
      }
      scrollToTopWithSpeed = () => {
        let gotoTop= () => {
          let currentPosition = document.documentElement.scrollTop || document.body.scrollTop
          currentPosition -= 25*(currentPosition/500) + 1
          if (currentPosition > 0) {
            window.scrollTo(0, currentPosition)
          }
          else {
            window.scrollTo(0, 0)
            clearInterval(timer)
            timer = null
          }
        }
        let timer=setInterval(gotoTop,1)
      }
      scrollTo = (y) =>{
        if(!document.body.scrollTop) document.documentElement.scrollTop = y
        if(!document.documentElement.scrollTop) document.body.scrollTop = y
      }
      render() {
        return <Target
          ref='page'
          {...this.props}
          topic={this.topic.stream}
          scrollActiveTopic={this.scrollActiveTopic.stream}
          changeLock={this.changeLock}
          scrollToTop={this.scrollToTop}
          scrollTo={this.scrollTo}
          unLock={this.unLock}
          scrollTop={this.state.scrollTop}
          scrollToTopWithSpeed= {this.scrollToTopWithSpeed}
        />
      }
    }
    return _
  }
}
