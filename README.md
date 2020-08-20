# ef-avatarcrop

> a component to crop avatar

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 一些属性
| props | 用途 | 类型 | 默认 |
|-------|-----|------|-----|
| `avatarUrl` | 传入的图片初始化路径 | `String` | 必须项 |
| `width` | 图片宽 | String | `100px` |
| `height` | 图片高 | String | `100px` |
| `borderRadius` | 图片边框圆角弧度 | `String` | `50%` |
| `acceptType` | 图片接受上传类型 | `String` | `image/*` |
| `duration` | 图片剪裁缩放器分割片段数 | `Number` | `100` |
| `stepratio` | 图片剪裁器缩放条初始值 | `Number` | `50`（需小于`duration`属性值） |
| `stepOnce` | 剪裁器每缩放一次的进度 | `Number` | `5` |
| `uploadApi` | 上传图片的接口 | `String` | 必须的 |

## 一些方法
| methods | 用途 |
|---------|-----|
| `uploadSucess` | 得到上传成功后返回的数据`resData`|

## 组件使用
```bash
npm install ef-avatarcrop -S
```

然后在项目的根目录下`main.js`文件引入
```js
import AvatarCrop from 'ef-avatarcrop'
```
然后使用
```js
Vue.use(AvatarCrop)
```
