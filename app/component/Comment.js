import React from 'react'
import { Link } from 'react-router-dom'
import { getUserAvatar } from '@util/imgUri'
import UserLink from '@comp/UserLink'
import moment from 'moment'

const parseComment = (commentStr) => {
    const matchHead = commentStr.indexOf('[at')
    const matchEnd = commentStr.indexOf('[/at]')
    if (matchHead >= 0 && matchEnd >= 0) {
        const beforeStr =  commentStr.slice(0, matchHead)
        const elementStr = commentStr.slice(matchHead + 3, matchEnd)
        const afterStr = commentStr.slice(matchEnd + 5)
        const coreData = elementStr.split(']')
        const _elementParam = coreData[0]
            .split(' ').filter(item => item !== '')
            .map(item => {
                const pair = item.split('=')
                return [pair[0], pair[1].slice(1, -1)]
            })
        
        const elementParam = Object.fromEntries(_elementParam)
        console.log(elementParam, beforeStr, afterStr)
        const elementLabel = coreData[1]
        return <>     
            <span style={{verticalAlign: 'middle'}}>{beforeStr}@ </span>
            <UserLink little style={{marginRight: -10, marginLeft: -2}} userid={elementParam.userid} username={elementLabel} userpagename={elementParam.userpagename} />
            <span style={{verticalAlign: 'middle'}}>{afterStr}</span>
        </>
    }
    return commentStr
}

export const CommentItem = (props) => {
    const { comment } = props
    return <div key={comment.commentid} className="comment-item">
        <div className="comment-user-info">
            <UserLink userid={comment.shouterid} username={comment.username} userpagename={comment.userpagename} />
            <div className="comment-time">({moment((+comment.dateline)*1000).format('YYYY-MM-DD hh:mm:ss')})</div>
        </div>  
        <div className="comment-msg">
            {parseComment(comment.content)}
        </div>
    </div>
}

export const CommentList = (props) => {
    const { commentList } = props
    return <div className="comment-list">
        {
            commentList.map(comment => <CommentItem comment={comment} key={comment.dateline} />)
        }
    </div>
}

