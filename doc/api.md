### 关于API的重新整理文档

# 账户部分

## 登录

- URL /Art/login/submit/ajax/1
- Method  POST
- params
  - `username` 用户名
  - `password` 密码
- 返回json关联数组
  - 登录成功：{'success': true, 'user': 登录用户信息}
  - 登录失败：{'success': false, 'errorInfo': 错误信息}
- 登录用户信息
  - `userid` 用户ID
  - `username` 用户名
  - `userpagename` 用户页域名，可使用 /user/{userpagename} 访问用户页
  - `email` Email地址
  - `introduction` 用户页的个人简介
  - `ipaddress` 登入IP
  - `viewcount` 用户页的浏览次数
  - `thank_fav_text` 当作品被别人收藏的时候弹出的感谢语（可以在设置里自定义）
  - `joindate` 加入日期（UNIX时间戳）
  - `lastlogintime` 上次登入日期（UNIX时间戳）
  - `newXXXdate`

## 检查是否登录

- URL /Art/remote/isLogin
- 返回json关联数组
  - 已登录：{'login': true, 'user': 登录用户信息}
  - 未登录：{'login': false}

## 登出

- URL /Art/login/logout/ajax/1
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false, 'errorinfo': 错误信息}

# 作品

## 作品列表

- URL /Art/remote/getArtworkList
- Method GET (以“/参数名/参数值”的方式附加在api地址后)
- params
  - `dateline` 时间戳（整数），可选（默认为0），为0时不起作用
  - `datelinemode` 时间方向，可选，可取'lt'（小于）或'gt'（大于），默认为'lt'
  - `offset`, `length` 从offset开始的length个结果。offset为可选（默认为0），length必须提供
- 返回json格式的数组，按时间戳降序排列，每个元素为一个关联数组，包括`artworkid`, `title`, `width`, `height`, `dateline` （UNIX时间戳）, `userid`, `username`, `favcount` （收藏数）, `fav`（如果当前登录用户没有收藏是`null`，收藏了的话是收藏时间的UNIX时间戳。没登录的话始终为`null`）
  - 例子
http://www.wilddream.net/Art/remote/getArtworkList/dateline/1400000000/datelinemode/gt/offset/0/length/5
发表时间戳>1400000000的作品按时间戳降序排列，从第0个开始的5个结果


## 单页作品

- URL /Art/view/{artworkid}/ajax/1
- 无额外参数，`{artworkid}` 替换为作品ID
- 返回json关联数组
  - `success` 请求是否成功
  - `artwork` 作品的各种信息
  - `author` 作者信息（`username`, `userpagename`）
  - `commentlist` 评论列表
  - `favlist` 收藏列表
  - `fav` 当前登录用户是否收藏本作品
  - `viewloglist` 如果当前登录用户为该作品作者，则提供该作品的浏览记录（哪些用户在什么时间访问了该作品）

## 收藏作品

### 收藏作品

- URL /Art/artwork/addfav/artworkid/{artworkid}
- 无额外参数，`{artworkid}` 替换为作品ID
- 返回1为成功，0为失败

### 取消收藏作品

- URL /Art/artwork/deletefav/artworkid/{artworkid}
- 无额外参数，`{artworkid}` 替换为作品ID
- 返回1为成功，0为失败

## 评论作品

- URL /Art/artwork/addcomment/artworkid/{artworkid}/ajax/1
- `{artworkid}` 替换为作品ID
- Method POST
  - `content` 评论内容
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false, 'errorInfo': 错误信息}

# 用户

## 用户基本信息

- URL /Art/userpage/profile/userpagename/{userpagename}/ajax/1
- `{userpagename}` 替换为用户的用户页域名后缀
- 返回json关联数组
  - `user` 用户信息（id、用户名、用户页域名后缀、简介）
  - `profile` 用户详细资料（所在地、性别、生日等，可能为空）
  - `watch` 当前登录用户是否关注了该用户（未关注的话该项为`null`，已关注的话，`dateline`为关注时间）
  - `watchlist` 该用户关注的用户列表
  - `watchedlist` 关注该用户的用户（粉丝）列表
  - `viewlogs` 最近访问该用户用户页的用户列表
  - `shoutlist` 该用户的留言列表
  - `artworkcount` 作品数
  - `favcount` 被收藏数
  - `pageviews` 总浏览量

## 用户作品列表

- URL /Art/userpage/gallery/userpagename/{userpagename}/ajax/1
- `{userpagename}` 替换为用户的用户页域名后缀
- 可后接`/folderid/{folderid}`返回某一作品文件夹下的作品列表
- 返回json关联数组
  - `artworks` 作品列表
  - `folders` 作品文件夹列表

## 用户收藏列表

- URL /Art/Userpage/fav/userpagename/{userpagename}/ajax/1
- `{userpagename}` 替换为用户的用户页域名后缀
- 返回json关联数组
  - `artworks` 收藏作品列表
  - `journals` 收藏文章列表

## 关注用户

### 关注用户

- URL /Art/Userpage/addwatch/userid/{userid}
- 无额外参数，`{userid}` 替换为用户ID
- 返回1为成功，0为失败

### 取消关注用户

- URL /Art/Userpage/deletewatch/userid/{artworkid}
- 无额外参数，`{userid}` 替换为用户ID
- 返回1为成功，0为失败

## 给用户留言

- URL /Art/Userpage/addshout/userid/{userid}/ajax/1
- `{userid}` 替换为用户ID
- Method POST
  - `content` 评论内容
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false, 'errorInfo': 错误信息}

# 图片

## 作品图片

- URL /Public/uploads/artwork/{userid}/{preview或thumb}/{artworkid}.jpg
  - `thumb` 缩略图（width <= 200, height <= 1000）
  - `preview` 大图（width <= 1024, height <= 1024，用于作品页浏览）

## 用户头像

- URL /Public/uploads/avatar/{userid}/avatar_{small或large}.jpg
  - `small` 小缩略图（width <= 50, height <= 50）
  - `large` 大缩略图（width <= 200, height <= 200）
