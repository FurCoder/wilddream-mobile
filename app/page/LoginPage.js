import React, { useState, useEffect, useCallback } from 'react'


const Login = () => {
    return <div className='login-page'>
        <div className="input-label">用户名</div>
        <input className='login-input' type="text" placeholder='请输入用户名'/>
        <div className="input-label">密码</div>
        <input className='login-input' type="password" placeholder='请输入密码'/>
        <button className="login-button" >登录</button>
    </div>
}

export default Login