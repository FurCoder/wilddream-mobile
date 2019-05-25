import React, { useState, useEffect, useCallback } from 'react'
import { getArtworkList } from '@util/api'
import { useScrollLoadMoreEffect } from '@util/effect'

const PAGE_LENGTH = 20

const getArtWrokPreviewUrl = (userid, artworkid) =>
  `https://www.wilddream.net/Public/uploads/artwork/${userid}/preview/${artworkid}.jpg`

const getUserAvatar = (userid) => 
  `https://www.wilddream.net/Public/uploads/avatar/${userid}/avatar_small.jpg`

const ArtComponent = (props) => {
  const { userid, username, artworkid, title } = props.art
  return <div className='art-block'>
    <img className='art-preview' src={getArtWrokPreviewUrl(userid, artworkid)} />
    <div className="art-info">
      <img className="base-avatar" src={getUserAvatar(userid)} />
      <span className="authur-name">{username}</span>
      <div className="art-info-title">{title}</div>
    </div>
  </div>
}

const HomePage = () => {
  const [ list, setList ] = useState([])
  const [ offset, setOffset ] = useState(0)
  const load = useCallback(() => {
    //showLoading()
    let aborted = false
    getArtworkList({ offset, length: PAGE_LENGTH }).then(res => {
      // hideLoading()
      if (aborted) { return }
      setList(prev => prev.concat(res))
    })
    return () => { aborted = true }
  }, [offset])
  useScrollLoadMoreEffect(() => {setOffset(prev => prev + PAGE_LENGTH)})
  useEffect(load, [load])
  return <div className='home-page'>
    { list.map(art => <ArtComponent art={art}/>) }
  </div>
}

export default HomePage