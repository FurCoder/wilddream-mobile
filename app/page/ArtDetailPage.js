import React, { useState, useEffect, useCallback, useMemo } from 'react'
import UserScrollList from '@comp/UserScrollList'
import { CommentList } from '@comp/Comment'
import UserLink from '@comp/UserLink'
import { getArtWorkDetail, addComment, getLocalLoginInfo, deleteComment } from '@util/api'
import { useSimpleFetch } from '@util/effect'
import FavButton from '@comp/FavButton'
import TitleBar from '@comp/TitleBar'
import { getUserAvatar, getArtWrokPreviewUrl } from '@util/imgUri'
import { Link } from 'react-router-dom'
import WxImageViewer from 'react-wx-images-viewer'

const ArtDetail = (props) => {
  const { userid, artworkid } = props.match.params
  const [ isViewerDisplay, setDisplay ] = useState(false)
  const [ isLoading, data, refresh ] = useSimpleFetch(getArtWorkDetail, {artworkid})
  const picSrc = getArtWrokPreviewUrl(userid, artworkid)
  return <div className='art-detail-page'>
    <TitleBar />
    {isViewerDisplay && <WxImageViewer onClose={() => setDisplay(false)} urls={[picSrc]} index={0}/>}
    {!isLoading && data.success === true && <>
                <img className='art-preview' onClick={() => setDisplay(true)} src={picSrc} />

                <div className="art-info-title">{data.artwork.title}</div>
                <div className="desc-info">
                  {data.artwork.description}
                </div>
                <UserLink
                  padding
                  userid={userid}
                  username={data.author.username}
                  userpagename={data.author.userpagename}
                  withFocus
                  refresh={refresh}
                  watch={data.watch}
                />
                <UserScrollList
                  title={<>
                        {`${data.artwork.favcount}只兽收藏了此作品`}
                        <FavButton fav={data.fav} artworkid={artworkid} refresh={refresh} />
                    </>}
                  userList={data.favlist}
                />
                <CommentList
                  enableDelButton
                  checkItemCanbeDel={(item) => {
                    if (!getLocalLoginInfo().login) { return false }
                    if (getLocalLoginInfo().user.userid === userid) { return true }
                    if (item.userid === getLocalLoginInfo().user.userid) {return true}
                    return false
                  }}
                  delFunc={deleteComment}
                  commentList={data.commentlist}
                  refresh={refresh}
                  submitParams={{contentid: artworkid, typeid: '1'}}
                  submitFunc={addComment}
                />
            </>
    }
    {!isLoading && data.success == false && <>
      <div className='art-info-title'>请先登录</div>
      <div className="desc-info">{data.errorinfo}</div>
    </>}
  </div>
}

export default ArtDetail