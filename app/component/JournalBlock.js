import React from 'react'
import UserLink from '@comp/UserLink'

const JournalBlock = (props) => {
  const { history } = props
  const { userid, username, contentid, content, userpagename, title, favcount, description, journalid } = props.journal
  const gotoJournal = () => history.push(`/journal-detail/${userid}/${contentid || journalid}`)
  return <div className='journal-block'>
    <div className='journal-preview'
      dangerouslySetInnerHTML={{__html: (description || content)}}
      onClick={gotoJournal}
    />
    <div className="journal-info">
      <UserLink
        userid={userid}
        username={username}
        userpagename={userpagename}
      />
      <div className="journal-info-title">{title}
        <span className="favcount">{(+favcount) !== 0 && ` ${favcount}人收藏`}</span>
      </div>
    </div>
  </div>
}

export default JournalBlock