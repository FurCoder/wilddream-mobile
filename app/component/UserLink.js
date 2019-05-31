import React from 'react'
import { Link } from 'react-router-dom'
import { getUserAvatar } from '@util/imgUri'

const UserList = (props) => {
    const { userid, userpagename, username, padding = false, little = false, style = {} } = props
    return <Link className="user-link" style={{
        ...(padding ? {padding: '0 15px'} : {}),
        ...(little ? {height: 25} : {}),
        ...style,
    }} to={`/user/${userpagename}`}>
        <img className="base-avatar" src={getUserAvatar(userid)} style={little ? {height: 20, width: 20} : {}} />
        <span className="authur-name">{username}</span>
    </Link>
}

export default UserList