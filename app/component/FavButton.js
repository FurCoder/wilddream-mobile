import React, { useState, useContext } from 'react'
import { __RouterContext }  from "react-router-dom"
import { addFav, deleteFav, checkLogin } from '@util/api'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import { Modal } from 'antd-mobile'

const FavButton = (props) => {
    const router = useContext(__RouterContext)
    const { artworkid } = props
    const [ fav, setFav ] = useState(props.fav)
    const handleClick = async (e) => {
        e.preventDefault()
        const { login } = await checkLogin()
        if (login !== true) {
            Modal.alert('收藏未成功', '需要先登录～', [
                { text: '先不要登', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => {
                    router.hsistory.push('/login')
                }},
            ])
            return null
        }
        const result = await (fav ? deleteFav : addFav)({artworkid})
        if (result === 1) {
            setFav(prev => !prev)
        }
    }
    return <div className='fav-button' 
        onClick={handleClick}
        style={{
            background: fav ? '#5c9a4f' : '#515d6b'
        }}
    >
        <Icon type="star" style={{fontSize: 12}} theme={ fav ? 'filled' : null }/>
        <span style={{marginLeft: 3}}>{ fav ? '已收藏' : '收藏' }</span>
    </div>
}

export default FavButton