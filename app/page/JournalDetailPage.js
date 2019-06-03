import React, { useState, useEffect, useCallback, useMemo } from 'react'
import UserScrollList from '@comp/UserScrollList'
import { CommentList } from '@comp/Comment'
import UserLink from '@comp/UserLink'
import { getJournalDetail, addCommentToArtwork, getLocalLoginInfo, deleteComment } from '@util/api'
import { useSimpleFetch } from '@util/effect'
import FavButton from '@comp/FavButton'
import { getUserAvatar, getArtWrokPreviewUrl } from '@util/imgUri'
import { Link } from 'react-router-dom'

const JournalDetail = (props) => {
    const { userid, journalid } = props.match.params
    const [ isLoading, data, refresh ] = useSimpleFetch(getJournalDetail, {journalid})
    console.log(userid, journalid)
    return <div className='journal-detail-page'>
        {
            isLoading ? <></> : <>
                <div className="title">{data.journal.title}</div>
                <UserLink
                    padding
                    userid={data.author.userid}
                    username={data.author.username}
                    userpagename={data.author.userpagename}
                    withFocus
                    refresh={refresh}
                    watch={data.watch}
                />
                <div className='journal-preview'
                    dangerouslySetInnerHTML={{__html:data.journal.content}}
                />
                <UserScrollList
                  title={<>
                        {`${data.journal.favcount}只兽收藏了此作品`}
                        <FavButton fav={data.fav} journalid={journalid} refresh={refresh} />
                    </>}
                  userList={data.favlist}
                />
            </>
        }
    </div>
}

export default JournalDetail