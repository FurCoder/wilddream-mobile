import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import { __RouterContext } from 'react-router'
import { getUser, getUserArtwork, deleteShout, getLocalLoginInfo, getUserJournal } from '@util/api'
import { getUserAvatar } from '@util/imgUri'
import { useSimpleFetch } from '@util/effect'
import { addShout } from '@util/api'
import UserScrollList from '@comp/UserScrollList'
import { CommentList } from '@comp/Comment'
import BlockState from '@comp/BlockState'
import TabSwitcher from '@comp/TabSwitcher'
import FocusButton from '@comp/FocusButton'
import { Link } from 'react-router-dom'
import ArtBlock from '@comp/ArtBlock'
import JournalBlock from '@comp/JournalBlock'
import TitleBar from '@comp/TitleBar'
import WxImageViewer from 'react-wx-images-viewer'
import { ArtLevelMap, ArtSpeciality } from '@const/FormMap'

const Profile = (props) => {
  const renderText = (str, render = str => str) => ((str || '') === '' || str === '0') ? <span className='is-void'>暂无</span> : render(str)
  const genderMap = ['雄性', '雌性', '其他']
  const renderGender = str => genderMap[str - 1]
  const {
    location,
    fursona_description,
    fursona_img,
    userid,
    fursona_name,
    fursona_species,
    gender,
    pixiv,
    plurk,
    school,
    tieba,
    twitter,
    weibo,
    birthday,
    deviantart,
    facebook_url,
    furaffinity,
    art_level,
    art_speciality,
  } = props.profile
  return <div className="user-profile-list">
    <div className="profile-item">
      <div className="profile-type">所在地</div>
      <div className="profile-state">{renderText(location)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">学校</div>
      <div className="profile-state">{renderText(school)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">艺术特长</div>
      <div className="profile-state">{renderText(art_speciality, str => ArtSpeciality[str-1].cn)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">艺术水平</div>
      <div className="profile-state">{renderText(art_level, str => ArtLevelMap[str -1].cn)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">性别</div>
      <div className="profile-state">{renderText(gender, renderGender)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">生日</div>
      <div className="profile-state">{renderText(birthday)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">新浪微博</div>
      <div className="profile-state">{renderText(weibo, str => `@${weibo}`)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">Twitter</div>
      <div className="profile-state">{renderText(twitter, str => `@${twitter}`)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">百度贴吧</div>
      <div className="profile-state">{renderText(tieba, str => <a target='_blank' href={decodeURI(`http://tieba.baidu.com/home/main?un=${str}`)}>
        { str }
      </a>)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">Plurk</div>
      <div className="profile-state">{renderText(plurk, str => <a target='_blank' href={decodeURI(`http://tieba.baidu.com/home/main?un=${str}`)}>
                [链接]
      </a>)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">Pixiv</div>
      <div className="profile-state">{renderText(pixiv, str => <a target='_blank' href={decodeURI(`http://www.pixiv.net/member.php?id=${str}`)}>
                [链接]
      </a>)}</div>
    </div>

    <div className="profile-item">
      <div className="profile-type">Deviantart</div>
      <div className="profile-state">{renderText(deviantart, str => <a target='_blank' href={decodeURI(`http://${str}.deviantart.com`)}>
                [链接]
      </a>)}</div>
    </div>

    <div className="profile-item">
      <div className="profile-type">Facebook</div>
      <div className="profile-state">{renderText(facebook_url, str => <a target='_blank' href={decodeURI(`http://http://www.facebook.com/${str}`)}>
                [链接]
      </a>)}</div>
    </div>

    <div className="profile-item">
      <div className="profile-type">Furaffinity</div>
      <div className="profile-state">{renderText(furaffinity, str => <a target='_blank' href={decodeURI(`http://www.furaffinity.net/user/${str}`)}>
                [链接]
      </a>)}</div>
    </div>

    <div className="profile-item next-block">
      <div className="profile-type">兽设定名称</div>
      <div className="profile-state">{renderText(fursona_name)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">兽设定种族</div>
      <div className="profile-state">{renderText(fursona_species)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">兽设定文字描述</div>
      <div className="profile-state">{renderText(fursona_description, str => <>{str.split('\n').map((_, i) => <div key={i}>{_}</div>)}</>)}</div>
    </div>
    <div className="profile-item">
      <div className="profile-type">兽设定图示</div>
      <div className="profile-state">
        {
          renderText(fursona_img, str => <Link to={`/art-detail/${userid}/${fursona_img}`}>
            <img src={`https://www.wilddream.net/Public/uploads/artwork/${userid}/thumb/${fursona_img}.jpg`}
              alt=""/>
          </Link>)
        }
      </div>
    </div>
  </div>
}

const UserGallery = (props) => {
  const { userpagename } = props
  const router = useContext(__RouterContext)
  const [ isLoading, data, refresh ] = useSimpleFetch(getUserArtwork, {userpagename})
  if (isLoading) { return <div></div> }
  return <div className='user-gallery'>
    {
      data.artworks.map(rowData => <ArtBlock key={rowData.artworkid} haveUserLink={false} art={rowData} history={router.history} />)
    }
  </div>
}

const UserJournal = (props) => {
  const { userpagename } = props
  const router = useContext(__RouterContext)
  const [ isLoading, data, refresh ] = useSimpleFetch(getUserJournal, {userpagename})
  if (isLoading) { return <div></div> }
  return <div className='user-gallery'>
    {
      data.journals.map(rowData => <JournalBlock key={rowData.journalid} haveUserLink={false} journal={rowData} history={router.history} />)
    }
  </div>
}

const UserPage = (props) => {
  const { userpagename } = props.match.params
  const [ isViewerDisplay, setDisplay ] = useState(false)
  const [ isLoading, data, refresh ] = useSimpleFetch(getUser, {userpagename})
  if (isLoading) { return null }
  const picUrl = getUserAvatar(data.user.userid, true)
    + ((getLocalLoginInfo().login && getLocalLoginInfo().user.userid === data.user.userid) ?
      `?hash=${localStorage.localAvatorHash}` : '')
  console.log(picUrl)
  return <div className='user-page'>
    {isViewerDisplay && <WxImageViewer onClose={() => setDisplay(false)} urls={[picUrl]} index={0}/>}
    <TitleBar />
    <div className="user-avator">
      <img onClick={() => setDisplay(true)} src={picUrl} alt=""/>
      <div className="info">
        <div className="name">
          {data.user.username}
          <FocusButton watch={data.watch} userid={data.user.userid} refresh={refresh}/>
        </div>
        <div className="intro">{ data.user.introduction === '' ? '还没有填写任何自我介绍' : data.user.introduction }</div>
      </div>
    </div>
    <TabSwitcher
      tabList={[
        {label: '画廊', content: <>
            <UserGallery userpagename={userpagename} />
        </>},
        {label: '文章', content: <>
          <UserJournal userpagename={userpagename} />
                </>},
        {label: '朋友们', content: <div className='comment-tab'>
          <CommentList
            enableDelButton
            checkItemCanbeDel={(item) => {
              if (!getLocalLoginInfo().login) { return false }
              if (getLocalLoginInfo().user.userid === data.user.userid) { return true }
              if (item.shouterid === getLocalLoginInfo().user.userid) {return true}
              return false
            }}
            delFunc={deleteShout}
            refresh={refresh}
            commentList={data.shoutlist}
            submitParams={{userid: data.user.userid}}
            submitFunc={addShout}
          />
        </div>},
        {label: '详细资料', content: <>
                    {
                      getLocalLoginInfo().login && getLocalLoginInfo().user.userid === data.user.userid &&
                      <Link to='/edit-profile' className='edit-my-profile'>修改我的资料</Link>
                    }
                    <BlockState
                      stateList={[
                        { label: '作品', state: data.artworkcount },
                        { label: '被收藏', state: data.favcount },
                        { label: '总浏览量', state: data.pageviews },
                        { label: '关注数', state: data.watchlist.length },
                        { label: '粉丝数', state: data.watchedlist.length },
                      ]}
                    />
                    <Profile profile={data.profile || {}} />
                    <UserScrollList
                      noScroll
                      title={'他关注了'}
                      userList={data.watchlist}
                    />
                    <UserScrollList
                      noScroll
                      title={'关注他的'}
                      userList={data.watchedlist}
                    />
                    <UserScrollList
                      title={'最近访问的fur们'}
                      userList={data.viewlogs}
                    />
                </>},
      ]}
    />
  </div>
}

export default UserPage