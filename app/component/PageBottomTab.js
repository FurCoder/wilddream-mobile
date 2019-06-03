import React, { useState, useContext } from 'react'
import { __RouterContext }  from 'react-router-dom'
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
    const router = useContext(__RouterContext)
    const history = router.history
    const activeKey = props.activeKey
    const onClick = (tab) => async () => {
        if (tab.key === 'ACTIVE') {
            const res = await checkAndGo(router, '您还没有登录', '需要登录才能查看动态的鸭', getLocalLoginInfo)
            if (!res) { return null }
        }
        history.push(tab.url)
    }
    return <div className="page-bottom-tab">
        {
            tabConfig.map((tab) => <div
                onClick={onClick(tab)}
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