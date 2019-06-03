import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { PullToRefresh, ListView } from 'antd-mobile'
import { Link } from 'react-router-dom'
import UserLink from '@comp/UserLink'
import ArtBlock from '@comp/ArtBlock'
import JournalBlock from '@comp/JournalBlock'
import { getActive } from '@util/api'
import PageBottomTab from '@comp/PageBottomTab'
import { getUserAvatar, getArtWrokPreviewUrl } from '@util/imgUri'

const PAGE_LENGTH = 20

const VoidList = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 !== row2
})

const ActiveBlock = (props) => {
  const { rowData, history } = props
  if (rowData.typeid === '1') {
    return <ArtBlock art={{
      ...rowData,
      artworkid: rowData.contentid
    }}
    history={history}
    />
  }
  if (rowData.typeid === '2') {
    return <JournalBlock
      journal={{
        ...rowData,
        journalid: rowData.contentid
      }}
      history={history}
    />
  }
  return <div></div>
}

const ActivePage = (props) => {
  const [ list, setList ] = useState([])
  const listDataSource = useMemo(() => VoidList.cloneWithRows(list), [list])
  const [ page, setPage ] = useState(0)
  const load = useCallback((refresh = false) => {
    let aborted = false
    getActive({ page: refresh ? 1 : page + 1 }).then(res => {
      if (aborted) { return }
      setList(prev => refresh ? res : [...prev, ...res])
      setPage(refresh ? 1 : page + 1)
    })
    return () => { aborted = true }
  }, [page])
  const onRefresh = () => load(true)
  useEffect(load, [])
  return <div className='active-page'>
    <ListView
      dataSource={listDataSource}
      renderRow={rowData => <ActiveBlock rowData={rowData} history={props.history} />}
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
    <PageBottomTab activeKey='ACTIVE' />
  </div>
}

export default ActivePage