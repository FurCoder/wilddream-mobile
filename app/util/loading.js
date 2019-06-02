import { Toast } from 'antd-mobile'

const cancelHide = {
  cancel: null
}

export const showLoading = () => {
  if (cancelHide.cancel) {
    cancelHide.cancel()
    cancelHide.cancel = null
  }
  Toast.loading('loading...')
}

export const hideLoading = () => {
  const id = setTimeout(() => {
    Toast.hide()
  }, 50)
  cancelHide.cancel = () => setTimeout(id)
}