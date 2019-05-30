import React from 'react'
import { Link } from 'react-router-dom'
import { getUserAvatar } from '@util/imgUri'
import UserLink from '@comp/UserLink'
import moment from 'moment'

export const CommentItem = (props) => {
    const { comment } = props
    return <div key={comment.commentid} className="comment-item">
        <div className="comment-user-info">
            <UserLink userid={comment.userid} username={comment.username} />
            <div className="comment-time">({moment((+comment.dateline)*1000).format('YYYY-MM-DD hh:mm:ss')})</div>
        </div>  
        <div className="comment-msg">
            {comment.content}
        </div>
    </div>
}

export const CommentList = (props) => {
    const { commentList } = props
    return <div className="comment-list">
        {
            commentList.map(comment => <CommentItem comment={comment} key={comment.commentid} />)
        }
    </div>
}

