import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Toast, PullToRefresh } from 'antd-mobile'
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
    // console.log(elementParam, beforeStr, afterStr)
    const elementLabel = coreData[1]
    return <>
            <span style={{verticalAlign: 'middle'}}>{beforeStr}@ </span>
            <UserLink little style={{marginRight: -10, marginLeft: -2}} userid={elementParam.userid} username={elementLabel} userpagename={elementParam.userpagename} />
            <span style={{verticalAlign: 'middle'}}>{parseComment(afterStr)}</span>
        </>
  }
  return commentStr
}

export const CommentItem = (props) => {
  const { comment, enableDelButton, checkItemCanbeDel, delFunc, refresh } = props
  const del = async () => {
    await delFunc(comment)
    await refresh()
  }
  return <div key={comment.commentid} className="comment-item">
    <div className="comment-user-info">
      <UserLink userid={comment.shouterid || comment.userid} username={comment.username} userpagename={comment.userpagename} />
      <div className="comment-time">({moment((+comment.dateline)*1000).format('YYYY-MM-DD hh:mm:ss')})</div>
      <div className="comment-button-group">
        {
          enableDelButton && checkItemCanbeDel(comment) && <div className="comment-button" onClick={del}>删除</div>
        }
        <div className="comment-button" onClick={props.reply}>回复</div>
      </div>
    </div>
    <div className="comment-msg">
      {parseComment(comment.content)}
    </div>
  </div>
}

export const CommentList = (props) => {
  const {
    commentList,
    submitParams = {},
    submitFunc,
    submitButtonLabel = '发表',
    refresh,
    enableDelButton = false,
    checkItemCanbeDel = () => false,
    delFunc,
  } = props
  const [ tmp, setTmp ] = useState('')
  const checkTmp = str => {
    if (str.length > 1000) {
      Toast.show('太长啦，请短于1000字')
      return false
    }
    if (str.length < 5) {
      Toast.show('太短啦，起码也要有5个字')
      return false
    }
    return true
  }
  const submit = async () => {
    if (!checkTmp(tmp)) { return null }
    const result = await submitFunc({
      ...submitParams,
      content: tmp,
    })
    console.log(result)
    setTmp('')
    refresh()
  }
  const _reply = username => () => {
    setTmp(prev => {
      const atStr = `@${username} ：`
      if (prev.indexOf(atStr) >= 0) { return prev }
      return `${atStr}${prev}`
    })
  }
  return <div className="comment-list">
    {
      commentList.map(comment => <CommentItem
        enableDelButton={enableDelButton}
        checkItemCanbeDel={checkItemCanbeDel}
        delFunc={delFunc}
        refresh={refresh}
        reply={_reply(comment.username)}
        comment={comment}
        key={comment.dateline}
      />)
    }
    <textarea className='input-area' onChange={e => setTmp(e.target.value)} value={tmp} />
    <button className="submit-button" onClick={submit}>{submitButtonLabel}</button>
  </div>
}

