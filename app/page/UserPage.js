import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { getUser } from '@util/api'
import { getUserAvatar } from '@util/imgUri'
import { useSimpleFetch } from '@util/effect'
import UserScrollList from '@comp/UserScrollList'
import { CommentList } from '@comp/Comment'
import BlockState from '@comp/BlockState'
import TabSwitcher from '@comp/TabSwitcher'
import FocusButton from '@comp/FocusButton'
import { Link } from 'react-router-dom'

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
    const ArtLevelMap = [
        {en: 'hobbyist', cn: '业余'},
        {en: 'student', cn: '学生'},
        {en: 'professional', cn: '专业'},
    ]
    const ArtSpeciality = [
        {en: 'digital_art', cn: '数字绘画'},
        {en: 'raditional_art', cn: '传统绘画'},
        {en: 'design', cn: '设计'},
        {en: 'film_and_anime', cn: '视频和动画'},
        {en: 'literature', cn: '文学'},
        {en: 'photography', cn: '摄影'},
        {en: 'artisan', cn: '手工制作'},
        {en: 'fursuiter', cn: '兽装制作和表演'},
        {en: 'other', cn: '其他'},
    ]
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

const UserPage = (props) => {
    const { userpagename } = props.match.params
    const [ isLoading, data, refresh ] = useSimpleFetch(getUser, {userpagename})
    if (isLoading) { return null }
    return <div className='user-page'>
        <div className="user-avator">
            <img src={getUserAvatar(data.user.userid, true)} alt=""/>
            <div className="info">
                <div className="name">
                    {data.user.username}
                    <FocusButton watch={data.watch} userid={data.user.userid}/>
                </div> 
                <div className="intro">{data.user.introduction}</div>
            </div>
        </div>
        <TabSwitcher
            tabList={[
                {label: '朋友们', content: <>
                    <UserScrollList
                        noScroll
                        title={`他关注了`}
                        userList={data.watchlist}
                    />
                    <UserScrollList
                        noScroll
                        title={`关注他的`}
                        userList={data.watchedlist}
                    />
                    <UserScrollList
                        title={`最近访问的fur们`}
                        userList={data.viewlogs}
                    />
                </>},
                {label: '留言', content: <>
                    <CommentList
                        commentList={data.shoutlist}
                    />
                </>},
                {label: '详细资料', content: <>
                    <BlockState
                        stateList={[
                            { label: '作品', state: data.artworkcount },
                            { label: '被收藏', state: data.favcount },
                            { label: '总浏览量', state: data.pageviews },
                            { label: '粉丝数', state: data.watchlist.length },
                        ]}
                    />
                    <Profile profile={data.profile} />
                </>},
            ]}
        />
    </div>
}

export default UserPage