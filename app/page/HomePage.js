import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { PullToRefresh, ListView } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { getArtworkList } from '@util/api'
import { getUserAvatar, getArtWrokPreviewUrl } from '@util/imgUri'

const PAGE_LENGTH = 20

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
  rowHasChanged: (row1, row2) => row1.artworkid !== row2.artworkid,
})

const HomePage = (props) => {
  const [ list, setList ] = useState([])
  const listDataSource = useMemo(() => VoidList.cloneWithRows(list), [list])
  const [ offset, setOffset ] = useState(0)
  const load = useCallback((refresh = false) => {
    let aborted = false
    getArtworkList({ offset: refresh ? 0 : offset, length: PAGE_LENGTH }).then(res => {
      if (aborted) { return }
      setList(prev => refresh ? res : [...prev, ...res])
      setOffset(refresh ? 0 : offset + PAGE_LENGTH)
    })
    return () => { aborted = true }
  }, [offset])
  const onRefresh = () => load(ture)
  useEffect(load, [])
  return <div className='home-page'>
    <ListView
      dataSource={listDataSource}
      renderRow={rowData => <ArtComponent art={rowData}/>}
      initialListSize={5}
      onEndReachedThreshold={150}
      onEndReached={() => load()}
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