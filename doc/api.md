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

## 设置

### 基本资料设置

- URL /Art/my/profile/submit/1/ajax/1
- Method POST
- params
    - 参考 https://www.wilddream.net/art/my/profile 的网页表单
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false, 'errorinfo': 错误信息}

### 详细资料及兽相关资料设置

- URL /Art/my/detailed_profile/submit/1/ajax/1
- Method POST
- params
    - 参考 https://www.wilddream.net/art/my/detailed_profile 的网页表单
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false, 'errorinfo': 错误信息}

### 头像设置

- URL /Art/my/avatar/submit/1/ajax/1
- Method POST
- params
    - `image` 头像图片
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false, 'errorinfo': 错误信息}

# 首页

## 首页作品列表

- URL /Art/index/index/ajax/1
- Method GET (以“?参数名1=值1&参数名2=值2”的方式附加在api地址后)
- params
  - `page` 页码，默认为1
  - `speciesid` 按物种类别id筛选，默认为0（不筛选）
  - `categoryid` 按作品类型id筛选，默认为0（不筛选）
  - `keyword` 搜索关键字
  - `sort` 作品排序方法（newest/popular_week/popular_month/popular_all）
- 返回json关联数组：
  - `contentlist` 作品列表数组，部分键意义如下
    - `dateline` 时间戳
    - `contentid` 内容id（如果`typeid`为1则是`artworkid`，如果`typeid`为2则是`journalid`）
    - `typeid` 类型id（1为Artwork，即绘画作品；2为Journal，即文章）
    - `description` 描述（`typeid`为1则是绘画作品描述，`typeid`为2则是文章内容）
    - `favcount` 收藏数
    - `fav` 当前登录用户是否收藏此作品。如果当前登录用户没有收藏是`null`，收藏了的话是收藏时间的UNIX时间戳。用户没登录的话始这个值终为`null`
  - `artworkcount` 本站的作品总数
  - `page` 当前是第几页
  - `keyword` 见上
  - `speciesid` 见上
  - `categoryid` 见上
  - `sort` 见上
  - `announcements` 首页公告列表
  - `tag_stat` 标签统计 
- 示例：https://www.wilddream.net/Art/index/activity/ajax/1 

## 首页最新动态（关注者的作品信息流）

- URL /Art/index/activity/ajax/1/page/{page}
- params
  - `page` 页码，默认为1
- 必须登录才会返回，否则返回`{'success': false, 'errorInfo': 错误信息}`
- 返回json关联数组：
  - `activitylist` 作品信息流
    - `dateline` 时间戳
    - `contentid` 内容id（如果`typeid`为1则是`artworkid`，如果`typeid`为2则是`journalid`）
    - `typeid` 类型id（1为Artwork，即绘画作品；2为Journal，即文章）
    - `description` 描述（`typeid`为1则是绘画作品描述，`typeid`为2则是文章内容）
    - `favcount` 收藏数
    - `fav` 当前登录用户是否收藏此作品。如果当前登录用户没有收藏是`null`，收藏了的话是收藏时间的UNIX时间戳。用户没登录的话始这个值终为`null`
  - `watchlist` 关注用户列表
  - `page` 当前是第几页
- 示例：https://www.wilddream.net/Art/index/activity/ajax/1 （登录状态访问有效）

# 作品

## 绘画作品（Artwork，typeid=1）

- URL /Art/view/{artworkid}/ajax/1
- 无额外参数，`{artworkid}` 替换为作品ID
- 返回json关联数组
  - `success` 请求是否成功
  - `artwork` 作品的各种信息
  - `author` 作者信息（`username`, `userpagename`）
  - `commentlist` 评论列表
  - `favlist` 收藏列表
  - `fav` 当前登录用户是否收藏本作品（仅登录时有该键对）
  - `watch` 当前登录用户是否关注了该作品的作者（仅登录时有该键对）
  - `viewloglist` 如果当前登录用户为该作品作者，则提供该作品的浏览记录（哪些用户在什么时间访问了该作品）

## 文章（Journal，typeid=2）

- URL /Journal/view/{journalid}/ajax/1
- 无额外参数，`{journalid}` 替换为文章ID
- 返回json关联数组
  - `success` 请求是否成功
  - `journal` 文章的各种信息
  - `author` 作者信息（`username`, `userpagename`）
  - `commentlist` 评论列表
  - `favlist` 收藏列表
  - `fav` 当前登录用户是否收藏本文章（仅登录时有该键对）
  - `watch` 当前登录用户是否关注了该文章的作者（仅登录时有该键对）
  - `viewloglist` 如果当前登录用户为该文章作者，则提供该文章的浏览记录（哪些用户在什么时间访问了该文章）

## 收藏作品

`contentid` 为内容id（如果`typeid`为1则是`artworkid`，如果`typeid`为2则是`journalid`）

### 收藏作品

- URL /Art/remote/addfav/contentid/{contentid}/typeid/{typeid}
- 无额外参数，`{contentid}` 替换为作品ID，`{typeid}`替换为类型id
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false, 'errorInfo': 错误信息}

### 取消收藏作品

- URL /Art/remote/deletefav/contentid/{contentid}/typeid/{typeid}
- 无额外参数，`{contentid}` 替换为作品ID，`{typeid}`替换为类型id
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false, 'errorInfo': 错误信息}

## 评论作品

`contentid` 为内容id（如果`typeid`为1则是`artworkid`，如果`typeid`为2则是`journalid`）

### 添加评论

- URL /Art/remote/addcomment/contentid/{contentid}/typeid/{typeid}
- `{contentid}` 替换为作品ID，`{typeid}`替换为类型id
- Method POST
  - `content` 评论内容
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false, 'errorInfo': 错误信息}

### 删除评论

- URL /Art/remote/deletecomment/commentid/{commentid}
- `{commentid}` 替换为评论ID
- 用户可以删除：1. 自己发表的评论 2. 自己作品底下的评论。其他的评论不可删除。
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false}

# 用户页

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
- 如成功，返回json关联数组
  - `success` = 1
  - `artworks` 作品列表
  - `folders` 作品文件夹列表

## 用户文章列表

- URL /Art/userpage/journal/userpagename/{userpagename}/ajax/1
- `{userpagename}` 替换为用户的用户页域名后缀
- 如成功，返回json关联数组
  - `success` = 1
  - `journals` 文章列表

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

## 删除用户留言

- URL /Art/Userpage/deleteshout/shoutid/{shoutid}/ajax/1
- `{shoutid}` 替换为留言ID
- 用户可以删除：1. 自己发表的留言 2. 自己用户页下的留言。其他的留言不可删除。
- 返回json关联数组
  - 成功：{'success': true}
  - 失败：{'success': false, 'errorInfo': 失败原因}

# 社群功能

## 委托列表

- URL /Community/Commissionpage/index/ajax/1/page/{page}
- `{page}` 替换为页码，可后加 `/keyword/{keyword}` 支持搜索关键字
- 返回委托列表的json数组

# 图片

## 作品图片

- URL /Public/uploads/artwork/{userid}/{preview或thumb}/{artworkid}.jpg
  - `thumb` 缩略图（width <= 200, height <= 1000）
  - `preview` 大图（width <= 1024, height <= 1024，用于作品页浏览）

## 用户头像

- URL /Public/uploads/avatar/{userid}/avatar_{small或large}.jpg
  - `small` 小缩略图（width <= 50, height <= 50）
  - `large` 大缩略图（width <= 200, height <= 200）
