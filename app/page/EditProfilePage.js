import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import TabSwitcher from '@comp/TabSwitcher'
import { getLocalLoginInfo } from '@util/api'
import { getUserAvatar } from '@util/imgUri'
import { Toast } from 'antd-mobile'

const EditAvator = (props) => {
    const userdata = getLocalLoginInfo()
    const [upload, setUpload] = useState(null)
    const [ form, setForm ] = useState(null)
    const handleFile = e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend =  () => {
            const dataURL = reader.result
            setUpload(dataURL)
            const formData = new FormData()
            formData.append('image', file)
            setForm(formData)
        }
    }
    const go = async () => {
        const res = await fetch('/Art/my/avatar/submit/1',
        {
            method: "POST",
            body: form,
            // headers: {
            //     "Content-Type": "multipart/form-data"
            // } 
        })
        console.log(res)
        if (res.ok) {
            Toast.success('头像成功！')
        }
        setUpload(null)
        setForm(null)
    }
    return <div className='edit-profile-avator'>
        <div className="intro">您当前的头像</div>
        <img className='prev-avator' src={getUserAvatar(userdata.user.userid, true) + `?hash=${Math.random()}`} alt=""/>
        <div className="upload-button">
            选择头像
            <input className='hidden-file-input' onChange={handleFile} type="file" capture="camera" accept="image/png,image/gif,image/jpeg" />
        </div>
        {
            upload && <>
                <div className="intro">您选择的头像</div>
                <img className='next-avator' src={upload}/>
            </>
        }
        {
            form !== null && <div className="upload-button" onClick={go}>上传</div>
        }
    </div>
}

const EditProfilePage = (props) => {
    return <div className='edit-profile' >
        <TabSwitcher
            tabList={[
                {label: '基本资料', content: <></>, },
                {label: '详细资料', content: <></>, },
                {label: '上传头像', content: <>
                    <EditAvator />
                </>, }
            ]}
        />
    </div>
}

export default EditProfilePage