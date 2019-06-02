import React from 'react'
import UserLink from '@comp/UserLink'
import { getArtWrokPreviewUrl } from '@util/imgUri'

const ArtBlock = (props) => {
  const { history, haveUserLink = true } = props
  const { userid, username, artworkid, userpagename, title, favcount } = props.art
  const gotoArt = () => history.push(`/art-detail/${userid}/${artworkid}`)
  return <div className='art-block'>
    <img className='art-preview' src={getArtWrokPreviewUrl(userid, artworkid, 'thumb')} onClick={gotoArt} />
    <div className="art-info">
      {
        haveUserLink && <UserLink
          userid={userid}
          username={username}
          userpagename={userpagename}
        />
      }
      <div className="art-info-title">{title}
        <span className="favcount">{(+favcount) !== 0 && ` ${favcount}人收藏`}</span>
      </div>
    </div>
  </div>
}

export default ArtBlock