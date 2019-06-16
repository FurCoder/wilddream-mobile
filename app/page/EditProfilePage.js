import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react'
import TabSwitcher from '@comp/TabSwitcher'
import { getLocalLoginInfo, checkLogin, setBaseProfile, setDetailedProfile } from '@util/api'
import { getUserAvatar } from '@util/imgUri'
import { Toast } from 'antd-mobile'
import TitleBar from '@comp/TitleBar'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { useSimpleFetch } from '@util/effect'

const EditAvator = (props) => {
  const userdata = getLocalLoginInfo()
  const [upload, setUpload] = useState(null)
  const [ form, setForm ] = useState(null)
  const [ loading, setLoading ] = useState(false)
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
    setLoading(true)
    const _res = await fetch((process.env.NODE_ENV === 'development' ? '' : 'https://www.wilddream.net/') + '/Art/my/avatar/submit/1/ajax/1',
      {
        method: 'POST',
        body: form,
        // headers: {
        //     "Content-Type": "multipart/form-data"
        // }
      })
    const res = await _res.json()
    console.log(res)
    if (res.success) {
      Toast.success('更新头像成功！')
      localStorage.localAvatorHash = `${Math.random()}`
    } else {
      Toast.success(res.errorinfo)
    }
    setUpload(null)
    setForm(null)
    setLoading(false)
  }
  return <div className='edit-profile-avator'>
    <div className="intro">您当前的头像</div>
    <img className='prev-avator' src={getUserAvatar(userdata.user.userid, true) + `?hash=${Math.random()}`} alt=""/>
    <div className="upload-button">
            选择头像
      <input className='hidden-file-input' onChange={handleFile} type="file" accept="image/png,image/gif,image/jpeg" />
    </div>
    {
      upload && <>
                <div className="intro">您选择的头像</div>
                <img className='next-avator' src={upload}/>
            </>
    }
    {
      form !== null && <div>
        <Button onClick={go} loading={loading} className="submit-button">编辑</Button>
      </div>
    }
  </div>
}



@Form.create({ name: 'base_edit' })
class EditBase extends React.Component {
  state = {
    loading: false,
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({loading: true})
        this.submitToServer(values)
      } else {
        return null
      }
    })
  }
  submitToServer = async (_values) => {
    const values = JSON.parse(JSON.stringify(_values))
    if (values.allow_email) {
      values.allow_email = 'on'
    } else {
      delete values.allow_email
    }
    const res = await setBaseProfile(values)
    if (res.success) {
      Toast.success('修改成功')
    } else {
      Toast.info(res.errorinfo)
    }
    this.setState({loading: false})
  }
  componentDidMount() {
    const { user } = this.props.userdata
    this.props.form.setFields({
      password: { value: '' },
      confirmpassword: { value: '' },
      email: { value: user.email },
      thank_fav_text: { value: user.thank_fav_text },
      introduction: { value: user.introduction },
      allow_email: { value: user.allow_email === '1' },
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return <Form onSubmit={this.handleSubmit} className="edit-base-form">
      <Form.Item>
        <div className="input-line">
          <div className="label">密码</div>
          <div className="input-area">
            {getFieldDecorator('password')(
              <Input
                placeholder="请输入密码"
                type='password'
              />,
            )}
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="input-line">
          <div className="label">密码确认</div>
          <div className="input-area">
            {getFieldDecorator('confirmpassword')(
              <Input
                placeholder="请输入密码"
                type='password'
              />,
            )}
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="input-line">
          <div className="label">E-mail</div>
          <div className="input-area">
            {getFieldDecorator('email')(
              <Input
                placeholder="请输入邮箱"
              />,
            )}
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="input-line">
          <div className="label">简介</div>
          <div className="input-area">
            {getFieldDecorator('introduction')(
              <Input
                placeholder="请输入您的自我简介"
                // type='password'
              />,
            )}
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="input-line">
          <div className="label">收藏提示</div>
          <div className="input-area">
            {getFieldDecorator('thank_fav_text')(
              <Input
                // type='password'
              />,
            )}
          </div>
        </div>
      </Form.Item>
      <Form.Item>
        <div className="input-line">
          <div className="label">允许Email通知</div>
          <div className="input-area">
            {getFieldDecorator('allow_email', {valuePropName: 'checked'})(
              <Checkbox />,
            )}
          </div>
        </div>
      </Form.Item>
      <Button loading={this.state.loading} htmlType="submit" className="submit-button">
        更新
      </Button>
    </Form>
  }
}

const EditProfilePage = (props) => {
  const [ isLoading, data, refresh ] = useSimpleFetch(checkLogin, {})
  return <div className='edit-profile' >
    <TitleBar mode='relative' title='资料编辑'/>
    <TabSwitcher
      tabList={[
        {label: '基本资料', content: <>
          {isLoading ? null : <EditBase userdata={data} refresh={refresh} />}
        </>, },
        // {label: '详细资料', content: <></>, },
        {label: '上传头像', content: <>
                    <EditAvator />
                </>, }
      ]}
    />
  </div>
}


export default EditProfilePage