import React from 'react'
import Icon from 'antd/lib/icon'

const TitleBar = (props) => {
  const {  mode='fixed', title = '' } = props
  const goBack = () => history.back()
  return <div className='title-bar-container' style={{
    position: mode
  }}>
    <div className="title-bar">
      <div className="back-button" onClick={goBack}>
        <Icon type="left"/>
      </div>
      <div className="title">{title}</div>
      <div className="right-button">

      </div>
    </div>
  </div>
}

export default TitleBar