import React from 'react'
import { Link } from 'react-router-dom'
import { getUserAvatar } from '@util/imgUri'

const UserList = (props) => {
    const { userid, userpagename, username } = props
    return <Link className="user-link" to={`/user/${userpagename}`}>
        <img className="base-avatar" src={getUserAvatar(userid)} />
        <span className="authur-name">{username}</span>
    </Link>
}

export default UserList