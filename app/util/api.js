import request from '@util/request'

export const login = data => request({
  url: '/Art/login/submit/ajax/1',
  data,
  method: 'POST',
  raw: true,
})

export const checkLogin = data => request({
  url: '/Art/remote/isLogin',
  data,
  method: 'POST',
})

export const getUser = data => request({
  url: `/Art/userpage/profile/userpagename/${data.userid}/ajax/1`,
  data,
})

export const getArtworkList = data => request({
  url: '/Art/remote/getArtworkList',
  data,
})

export const getArtWorkDetail = data => request({
  url: `/Art/view/${data.artworkid}/ajax/1`,
  data: {},
})

export const addFav = data => request({
  url: `/Art/artwork/addfav/artworkid/${data.artworkid}`,
  data: {},
  method: 'POST',
})

export const deleteFav = data => request({
  url: `/Art/artwork/deletefav/artworkid/${data.artworkid}`,
  data: {},
  method: 'POST',
})

