import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { PullToRefresh, ListView } from 'antd-mobile'
import { Link } from 'react-router-dom'
import UserLink from '@comp/UserLink'
import ArtBlock from '@comp/ArtBlock'
import PageBottomTab from '@comp/PageBottomTab'
import { getArtworkList } from '@util/api'
import { getUserAvatar, getArtWrokPreviewUrl } from '@util/imgUri'

const PAGE_LENGTH = 20

const VoidList = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1.artworkid !== row2.artworkid,
})

const HomePage = (props) => {
  const refContainer = useRef(null)
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
  const onRefresh = () => {
    load(true)
    refContainer.current.scrollTo(0, 0)
  }
  useEffect(load, [])
  return <div className='home-page page-bottom-padding'>
    <ListView
      ref={refContainer}
      dataSource={listDataSource}
      renderRow={rowData => <ArtBlock art={rowData} history={props.history} />}
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
    <PageBottomTab activeKey='ALLWORKS' refresh={onRefresh}/>
  </div>
}

export default HomePage