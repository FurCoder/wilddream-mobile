import { Toast } from 'antd-mobile'

export const showLoading = () => {
    Toast.loading('loading...')
}

export const hideLoading = () => {
    Toast.hide()
}