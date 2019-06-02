import React, { useState, useContext } from 'react'
import { __RouterContext }  from "react-router-dom"
import { addWatch, deleteWatch, checkLogin } from '@util/api'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import { Modal } from 'antd-mobile'

const FocusButton = (props) => {
    const router = useContext(__RouterContext)
    const { userid } = props
    const [ watch, setWatch ] = useState(props.watch)
    const handleClick = async (e) => {
        e.preventDefault()
        const { login } = await checkLogin()
        if (login !== true) {
            Modal.alert('关注未成功', '需要先登录～', [
                { text: '先不要登', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => {
                    router.history.push('/login')
                }},
            ])
            return null
        }
        const result = await (watch ? deleteWatch : addWatch)({userid})
        if (result === 1) {
            setWatch(prev => !prev)
        }
        return null
    }
    return <div className='focus-button' 
        onClick={handleClick}
        style={{
            background: watch ? '#5c9a4f' : '#515d6b'
        }}
    >
        <Icon type="heart" style={{fontSize: 12}} theme={ watch ? 'filled' : null }/>
        <span style={{marginLeft: 3}}>{ watch ? '已关注' : '关注' }</span>
    </div>
}

export default FocusButton