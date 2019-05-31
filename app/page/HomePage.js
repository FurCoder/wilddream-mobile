import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { PullToRefresh, ListView } from 'antd-mobile'
import { Link } from 'react-router-dom'
import UserLink from '@comp/UserLink'
import { getArtworkList } from '@util/api'
import { getUserAvatar, getArtWrokPreviewUrl } from '@util/imgUri'

const PAGE_LENGTH = 20

const ArtComponent = (props) => {
  const { history } = props
  const { userid, username, artworkid, userpagename, title, favcount } = props.art
  const gotoArt = () => history.push(`/art-detail/${userid}/${artworkid}`)
  return <div className='art-block'>
    <img className='art-preview' src={getArtWrokPreviewUrl(userid, artworkid, 'thumb')} onClick={gotoArt} />
    <div className="art-info">
      <UserLink
          userid={userid}
          username={username}
          userpagename={userpagename}
      />
      <div className="art-info-title">{title}
        <span className="favcount">{(+favcount) !== 0 && ` ${favcount}人收藏`}</span>
      </div>
    </div>
  </div>
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
      renderRow={rowData => <ArtComponent art={rowData} history={props.history} />}
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