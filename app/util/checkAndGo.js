import React from 'react'
import { checkLogin } from '@util/api'
import { Modal } from 'antd-mobile'

const checkAndGo = async (router) => {
  const { login } = await checkLogin()
  if (login !== true) {
    Modal.alert('收藏未成功', '需要先登录～', [
      { text: '先不要登', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () => {
        router.hsistory.push('/login')
      }},
    ])
  }
  return login
}

export default checkAndGo