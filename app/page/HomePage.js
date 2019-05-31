import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { getArtworkList } from '@util/api'
import { PullToRefresh, ListView } from 'antd-mobile'
import { Router, Route, Link } from 'react-router-dom'

const PAGE_LENGTH = 20

const getArtWrokPreviewUrl = (userid, artworkid) =>
  `https://www.wilddream.net/Public/uploads/artwork/${userid}/preview/${artworkid}.jpg`

const getUserAvatar = (userid) => 
  `https://www.wilddream.net/Public/uploads/avatar/${userid}/avatar_small.jpg`

const ArtComponent = (props) => {
  const { userid, username, artworkid, title, favcount } = props.art
  return <Link className='art-block' to={`/art-detail/${userid}/${artworkid}`}>
    <img className='art-preview' src={getArtWrokPreviewUrl(userid, artworkid)} />
    <div className="art-info">
      <img className="base-avatar" src={getUserAvatar(userid)} />
      <span className="authur-name">{username}</span>
      <div className="art-info-title">{title}
        <span className="favcount">{(+favcount) !== 0 && ` ${favcount}人收藏`}</span>
      </div>
    </div>
  </Link>
}

const VoidList = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2,
})

const HomePage = (props) => {
  const [ list, setList ] = useState([])
  const listDataSource = useMemo(() => VoidList.cloneWithRows(list), [list])
  const [ offset, setOffset ] = useState(0)
  const load = useCallback(() => {
    let aborted = false
    getArtworkList({ offset, length: PAGE_LENGTH }).then(res => {
      if (aborted) { return }
      setList(prev => [...prev, ...res])
    })
    return () => { aborted = true }
  }, [offset])
  const onRefresh = () => {
    setList([])
    setOffset(0)
    load()
  }
  useEffect(load, [])
  return <div className='home-page'>
    <ListView
      dataSource={listDataSource}
      renderRow={rowData => <ArtComponent art={rowData}/>}
      initialListSize={5}
      onEndReachedThreshold={150}
      onEndReached={() => {
        setOffset(prev => prev + PAGE_LENGTH)
        load()
      }}
      pullToRefresh={<PullToRefresh
        refreshing={false}
        onRefresh={onRefresh}
      />}
      style={{
        height: '100%',
        overflow: 'auto',
        background: '#2b3e50',
      }}
    />
  </div>
}

export default HomePage