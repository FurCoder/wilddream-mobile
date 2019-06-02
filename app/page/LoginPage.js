import React, { useState, useEffect, useCallback } from 'react'
import { Toast } from 'antd-mobile'
import { login, checkLogin } from '@util/api'

const Login = (props) => {
  const [formData, setFrom] = useState({
    username: '',
    password: '',
  })
  const setValue = key => e => {
    setFrom(prev => ({
      ...prev,
      [key]: event.target.value,
    }))
  }
  const toLogin = async () => {
    console.log(formData)
    const res = await login({...formData})
    if (res.success) {
      Toast.success('登录成功，欢迎回来')
      props.history.goBack()
    } else {
      Toast.success('登录失败，请重试')
    }
  }
  return <div className='login-page'>
    <div className="input-label">用户名</div>
    <input
      className='login-input'
      type="text"
      placeholder='请输入用户名'
      value={formData.username}
      onChange={setValue('username')}
    />
    <div className="input-label">密码</div>
    <input
      className='login-input'
      type="password"
      placeholder='请输入密码'
      value={formData.password}
      onChange={setValue('password')}
    />
    <button className="login-button" onClick={toLogin}>登录</button>
  </div>
}

export default Login