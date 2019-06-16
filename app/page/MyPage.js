import React, { useState, useEffect, useCallback, useMemo } from 'react'
import PageBottomTab from '@comp/PageBottomTab'
import Icon from 'antd/lib/icon'
import { getLocalLoginInfo, checkLogin } from '@util/api'
import { useSimpleFetch } from '@util/effect'
import { getUserAvatar } from '@util/imgUri'
import { Link } from 'react-router-dom'

const UserLineBlock = (props) => {
  const {
    to = '/',
    icon,
    iconComp,
    iconTheme = 'filled',
    label = ''
  } = props
  return <Link className="user-line" to={to} >
    {
      icon ?
        <Icon type={icon} theme={iconTheme} /> :
        iconComp
    }
    {label}
  </Link>
}

const MyPage = (props) => {
  // const loginStatus = getLocalLoginInfo()
  const [ isLoading, data, refresh ] = useSimpleFetch(checkLogin, {})
  const gotoLogin = <Link to='/login' className="goto-login-button">去登陆</Link>
  return <div className='my-page'>
    {
      isLoading ?
                <></> : (
                  (!data.login) ? gotoLogin : <>
                    <Link to={`/user/${data.user.userpagename}`} className="user-profile-box">
                      <img src={getUserAvatar(data.user.userid, true) + `?hash=${localStorage.localAvatorHash}`} className="user-avator"/>
                      <div className="user-info">
                        <div className="user-username">{data.user.username}</div>
                        <div className="user-intro">{data.user.introduction === '' ? '还没有填写自我简介......' : data.user.introduction}</div>
                      </div>
                    </Link>
                    <div className="user-group">
                      <UserLineBlock icon='star' label='我的收藏' />
                    </div>
                    <div className="user-group">
                      <UserLineBlock icon='mail' label='站内消息' />
                    </div>
                    <div className="user-group">
                      <UserLineBlock icon='message' label='我收到的评论' />
                      <UserLineBlock iconComp={<i>@</i>} label='@我的' />
                    </div>
                </>
                )
    }
    <PageBottomTab activeKey='MY' />
  </div>
}

export default MyPage