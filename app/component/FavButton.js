import React, { useState, useContext } from 'react'
import { __RouterContext }  from 'react-router-dom'
import { addFav, deleteFav, addFavtoJournal, deleteFavtoJournal, checkLogin } from '@util/api'
import checkAndGo from '@util/checkAndGo'
import Icon from 'antd/lib/icon'
import 'antd/lib/icon/style/css'
import { Modal } from 'antd-mobile'

const FavButton = (props) => {
  const router = useContext(__RouterContext)
  const { artworkid, journalid, refresh } = props
  const [ fav, setFav ] = useState(props.fav)
  const handleClick = async (e) => {
    e.preventDefault()
    if (!checkAndGo()) { return null }
    let result = null
    if (artworkid) {
      result = await (fav ? deleteFav : addFav)({artworkid})
    }
    if (journalid) {
      result = await (fav ? deleteFavtoJournal : addFavtoJournal)({journalid})
    }
    if (result === 1) {
      setFav(prev => !prev)
    }
    refresh()
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