import React from 'react'
import { Link } from 'react-router-dom'
import { getUserAvatar } from '@util/imgUri'

const UserScrollList = (props) => {
    const { title, userList, noScroll } = props
    return <div className="user-scroll-list">
        <div className="fav-title">{title}</div>
        <div className="fav-user-list" style={noScroll ? {
            flexFlow: 'row wrap',
            height: 'auto',
            justifyContent: 'flex-start'
        } : {}}>
            {
                userList.map(user => <Link
                    key={user.userid}
                    to={`/user/${user.userpagename}`} className="fav-avatar"
                    style={{ 
                        ...(noScroll ? {margin: 0} : {}),
                        background: `url(${getUserAvatar(user.userid)
                    }) no-repeat center center / cover`}}
                />)
            }
        </div>
    </div>
}

export default UserScrollList