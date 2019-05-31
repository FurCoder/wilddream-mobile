import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { getUser } from '@util/api'
import { getUserAvatar } from '@util/imgUri'
import { useSimplePromise } from '@util/effect'
import UserScrollList from '@comp/UserScrollList'
import { CommentList } from '@comp/Comment'

const UserPage = (props) => {
    const { userpagename } = props.match.params
    const promise = useMemo(() => getUser({userpagename}), [userpagename])
    const { isLoading, data } = useSimplePromise(promise)
    if (isLoading) { return null }
    return <div className='user-page'>
        <div className="user-avator">
            <img src={getUserAvatar(data.user.userid, true)} alt=""/>
            <div className="info">
                <div className="name">{data.user.username}</div>
                <div className="intro">{data.user.introduction}</div>
            </div>
        </div>
        <UserScrollList
            title={`他关注了`}
            userList={data.watchlist}
        />
        <UserScrollList
            title={`关注他的`}
            userList={data.watchedlist}
        />
        <UserScrollList
            title={`最近访问的fur们`}
            userList={data.viewlogs}
        />
        <CommentList
            commentList={data.shoutlist}
        />
    </div>
}

export default UserPage