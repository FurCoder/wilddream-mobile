import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { getUserAvatar } from '@util/imgUri'

const UserPage = (props) => {
    const { userid } = props.match.params
    return <div className='user-page'>
        <div className="user-avator">
            <img src={getUserAvatar(userid, true)} alt=""/>
            <div className="info">
                <div className="name">COMMANDER--WOLFE</div>
                <div className="intro">emmmmmmmm恶魔面膜买, emmmmmmmm恶魔面膜买,</div>
            </div>
        </div>
    </div>
}

export default UserPage