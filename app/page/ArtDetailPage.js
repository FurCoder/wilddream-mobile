import React, { useState, useEffect, useCallback, useMemo } from 'react'
import UserScrollList from '@comp/UserScrollList'
import { CommentList } from '@comp/Comment'
import UserLink from '@comp/UserLink'
import { getArtWorkDetail } from '@util/api'
import { useSimpleFetch } from '@util/effect'
import { getUserAvatar, getArtWrokPreviewUrl } from '@util/imgUri'
import { Link } from 'react-router-dom'

const ArtDetail = (props) => {
    const { userid, artworkid } = props.match.params
    const [ isLoading, data, refresh ] = useSimpleFetch(getArtWorkDetail, {artworkid})
    return <div className='art-detail-page'>
        <img className='art-preview' src={getArtWrokPreviewUrl(userid, artworkid)} />
        {
            isLoading || <>
                <div className="art-info-title">{data.artwork.title}</div>
                <div className="desc-info">
                    {data.artwork.description}
                </div>
                <UserLink
                    padding
                    userid={userid}
                    username={data.author.username}
                    userpagename={data.author.userpagename}
                />
                <UserScrollList
                    title={`${data.artwork.favcount}只兽收藏了此作品`}
                    userList={data.favlist}
                />
                <CommentList
                    commentList={data.commentlist}
                />
            </>
        }
    </div>
}

export default ArtDetail