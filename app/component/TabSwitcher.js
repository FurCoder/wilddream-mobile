import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

const TabSwitcher = (props) => {
  const [activeIndex, setIndex] = useState(0)
  // useEffect(() => { setIndex(0) }, [props.tabList])
  return <div className="tab-switcher">
    <div className="tab-button-group">
      {
        props.tabList.map((tab, i) => <div
          key={i}
          onClick={() => setIndex(i)}
          className={classNames(
            'tab-button',
            { 'active-tab-button': activeIndex === i }
          )}>
          { tab.label }
        </div>)
      }
    </div>
    {
      props.tabList.map((tab, i) => <div
        key={i}
        className="tab-container"
        style={{
          display: i === activeIndex ? 'block' : 'none'
        }}
      >
        {tab.content}
      </div>)
    }
  </div>
}

export default TabSwitcher