import request from '@util/request'

export const login = data => request({
  url: '/Art/login/submit/ajax/1',
  data,
  method: 'POST',
  // raw: true,
})

export const _checkLogin = data => request({
  url: '/Art/remote/isLogin',
  data,
  method: 'POST',
})

export const checkLogin = async data => {
  const result = await _checkLogin(data)
  if (!result.login) {
    window.localStorage.login = '{}'
  } else {
    window.localStorage.login = JSON.stringify(result)
  }
  return result
}

export const getLocalLoginInfo = () => {
  const info = window.localStorage.login
  if (!info) {return {}}
  try {
    return JSON.parse(info)
  } catch (e) {
    return {}
  }
}

export const getUser = data => request({
  url: `/Art/userpage/profile/userpagename/${data.userpagename}/ajax/1`,
  data,
})

export const getUserArtwork = data => request({
  url: `/Art/userpage/gallery/userpagename/${data.userpagename}/ajax/1`,
  data,
})

export const getUserJournal = data => request({
  url: `/Art/userpage/journal/userpagename/${data.userpagename}/ajax/1`,
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

export const addFavtoJournal = data => request({
  url: `/Art/journal/addfav/journalid/${data.journalid}`,
  data: {},
  method: 'GET',
})

export const deleteFavtoJournal = data => request({
  url: `/Art/journal/deletefav/journalid/${data.journalid}`,
  data: {},
  method: 'GET',
})

export const addWatch = data => request({
  url: `/Art/Userpage/addwatch/userid/${data.userid}`,
  data: {},
  method: 'POST',
})

export const deleteWatch = data => request({
  url: `/Art/Userpage/deletewatch/userid/${data.userid}`,
  data: {},
  method: 'POST',
})

export const getActive = data => request({
  url: `/Art/index/activity/ajax/1/page/${data.page}`,
  data: {},
  method: 'GET',
})

export const addCommentToArtwork = data => request({
  url: `/Art/artwork/addcomment/artworkid/${data.artworkid}/ajax/1`,
  data: {
    content: data.content
  },
  method: 'POST',
})

export const addComment = data => request({
  url: `/Art/remote/addcomment/contentid/${data.contentid}/typeid/${data.typeid}`,
  data: {
    content: data.content
  },
  method: 'POST',
})

export const addShout = data => request({
  url: `/Art/Userpage/addshout/userid/${data.userid}/ajax/1`,
  data: {
    content: data.content
  },
  method: 'POST',
})

export const deleteComment = data => request({
  url: `/Art/remote/deletecomment/commentid/${data.commentid}`,
  method: 'GET',
})

export const deleteShout = data => request({
  url: `/Art/Userpage/deleteshout/shoutid/${data.shoutid}/`,
  method: 'GET',
})

export const getJournalDetail = data => request({
  url: `/Journal/view/${data.journalid}/ajax/1`,
})