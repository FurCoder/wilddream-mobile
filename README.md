\>>> 项目已迁移至 https://github.com/FurCoder/pxview <<<

# wilddream-mobile 🐺🐲
~~中央研究决定，技术栈另请高明~~
- React
- Cordova

### [API 简述](doc/api.md)

### [规划的页面🕊️](doc/page.md)

## 编译内容页
- 安装 [Node.js](https://nodejs.org)
- 安装依赖管理器 [yarn](https://yarnpkg.com)
  ```
  npm i -g yarn
  ```
- 安装依赖。在项目根目录运行命令
  ```
  yarn
  ```
- 编译页面内容
  ```
  npm run build
  ```
  输出内容在 `public` 文件夹
- 预览网页
  ```
  npm run start
  ```
  访问 `http://127.0.0.1:8080`

## 编译 APK
- 安装 [Android SDK](https://developer.android.google.cn/studio?hl=zh-cn#downloads) 和 Java JDK 8
- 安装 cordova 9.0.0
  ```
  npm i -g cordova@9.0.0
  ```
- 将根目录 `public` 文件夹下的内容复制到 `wilddream-app/www`
  ```
  copy public wilddream-app/www
  ```
- 进入 `wilddream-app` 文件夹，添加 cordova 的 Android 支持
  ```
  cd wilddream-app
  cordova platform add android
  ```
- 安装依赖并编译
  ```
  npm i
  cordova build android
  ```
