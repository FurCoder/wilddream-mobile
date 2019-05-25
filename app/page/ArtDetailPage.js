import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { getArtWorkDetail } from '@util/api'
import { useSimplePromise } from '@util/effect'
import { Link } from 'react-router-dom'
import moment from 'moment'

const getArtWrokPreviewUrl = (userid, artworkid) =>
  `https://www.wilddream.net/Public/uploads/artwork/${userid}/preview/${artworkid}.jpg`

  const getUserAvatar = (userid) => 
  `https://www.wilddream.net/Public/uploads/avatar/${userid}/avatar_small.jpg`

const ArtDetail = (props) => {
    const { userid, artworkid } = props.match.params
    const promise = useMemo(() => getArtWorkDetail({artworkid}), [artworkid])
    const { isLoading, data } = useSimplePromise(promise)
    return <div className='art-detail-page'>
        <img className='art-preview' src={getArtWrokPreviewUrl(userid, artworkid)} />
        {
            isLoading || <>
                <div className="art-info-title">{data.artwork.title}</div>
                <div className="desc-info">
                    {data.artwork.description}
                </div>
                <div className="authur-info">
                    <img className="base-avatar" src={getUserAvatar(userid)} />
                    <span className="authur-name">{data.author.username}</span>
                </div>

                <div className="fav-list">
                    <div className="fav-title">{data.artwork.favcount}只兽收藏了此作品</div>
                    <div className="fav-user-list">
                        {
                            data.favlist.map(user => <Link
                                key={user.userid}
                                to={`/user/${user.userid}`} className="fav-avatar"
                                style={{background: `url(${getUserAvatar(user.userid)}) no-repeat center center / cover`}}
                            />)
                        }
                    </div>
                </div>
                <div className="comment-list">
                    {
                        data.commentlist.map(comment => <div key={comment.commentid} className="comment-item">
                            <div className="authur-info">
                                <img className="base-avatar" src={getUserAvatar(comment.userid)} />
                                <span className="authur-name">{comment.username}</span>
                                <div className="comment-time">({moment((+comment.dateline)*1000).format('YYYY-MM-DD hh:mm:ss')})</div>
                            </div>  
                            <div className="comment-msg">
                                {comment.content} 
                            </div>
                        </div>)
                    }
                </div>
            </>
        }

    </div>
}

export default ArtDetail