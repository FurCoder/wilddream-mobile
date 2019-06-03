import React from 'react'
import { checkLogin } from '@util/api'
import { Modal } from 'antd-mobile'

const checkAndGo = async (router, title = '操作未成功', content = '需要先登录～', checkFunc = checkLogin) => {
  const { login } = await checkFunc()
  if (login !== true) {
    Modal.alert(title, content, [
      { text: '先不要登', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => {
        router.hsistory.push('/login')
      }},
    ])
  }
  return login
}

export default checkAndGo