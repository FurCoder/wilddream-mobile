const baseUri = 'https://www.wilddream.net'

export const getUserAvatar = (userid, isLarge = false) =>
  `${baseUri}/Public/uploads/avatar/${userid}/avatar_${isLarge ? 'large' : 'small'}.jpg`

export const getArtWrokPreviewUrl = (userid, artworkid, mode = 'preview') =>
  `${baseUri}/Public/uploads/artwork/${userid}/${mode}/${artworkid}.jpg`