import React from 'react'
import { Link } from 'react-router-dom'
import { getUserAvatar } from '@util/imgUri'

const UserScrollList = (props) => {
    const { title, userList } = props
    return <div className="user-scroll-list">
        <div className="fav-title">{title}</div>
        <div className="fav-user-list">
            {
                userList.map(user => <Link
                    key={user.userid}
                    to={`/user/${user.userid}`} className="fav-avatar"
                    style={{background: `url(${getUserAvatar(user.userid)}) no-repeat center center / cover`}}
                />)
            }
        </div>
    </div>
}

export default UserScrollList