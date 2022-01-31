import React, { useState, useContext } from 'react'
import { __RouterContext } from 'react-router'
import Icon from 'antd/lib/icon'
import checkAndGo from '@util/checkAndGo'
import { getLocalLoginInfo } from '@util/api'
import classNames from 'classnames'

const tabConfig = [
  { key: 'ALLWORKS', label: '所有作品', url: '/', icon: 'home'},
  { key: 'ACTIVE', label: '最新动态', url: '/active', icon: 'bar-chart' },
  { key: 'MY', label: '我的', url: '/my', icon: 'user' },
]

const PageBottomTab = (props) => {
  const [dcLock, setLock] = useState(false)
  const router = useContext(__RouterContext)
  const history = router.history
  const activeKey = props.activeKey
  const onClick = (tab, isActiveTab) => async () => {
    if (isActiveTab) {
      if (dcLock === true) {
        console.log('确认双击事件')
        props.refresh && props.refresh()
        setLock(false)
      } else {
        console.log('确认双击事件第一阶段')
        setLock(true)
        setTimeout(() => {
          console.log('确认双击事件第一阶段失效')
          setLock(false)
        }, 1000)
      }
      return null
    }
    if (tab.key === 'ACTIVE') {
      const res = await checkAndGo(router, '您还没有登录', '需要登录才能查看动态的鸭', getLocalLoginInfo)
      if (!res) { return null }
    }
    history.push(tab.url)
  }
  return <div className="page-bottom-tab">
    {
      tabConfig.map((tab) => <div
        onClick={onClick(tab, activeKey === tab.key)}
        key={tab.key} className={
          classNames('page-bottom-tab-block', {'page-bottom-tab-block-active': activeKey === tab.key})
        }>
        <div className='tab-icon'>
          <Icon type={tab.icon} style={{fontSize: 15}}/>
        </div>
        <div className='tab-label'>
          { tab.label }
        </div>
      </div>)
    }
  </div>
}

export default PageBottomTab