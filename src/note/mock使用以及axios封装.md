## Mock的使用

> mock模拟接口，使用默认的devserve 完成，考虑到这边有后台提供的模拟数据，随不需要自己随机生成数据，如果说有需要自己随机生成数据，可以使用[mockjs]([Mock.js (mockjs.com)](http://mockjs.com/))

### 写mock接口

1. 在`src/`目录下新建mock目录，存放所有的mock文件

2. 在`src/mock/ `目录下新建`home.js`

3. `home.js` mock 文件内容

   ```javascript
   /**
    * @desc 处理返回banner 数据
    * @param { object } request express 请求对象
    * @param { object } response express 响应对象
    * @returns { object } json 对象
    */
   const getAdverising = (request, response) => {
     const result = {
       "errorCode": 0,
       "errorMessage": "success",
       "data": {
         "advertising_list": [{
           "id": "27",
           "title": "特供",
           "link": "\/pages\/productDetail\/index?id=295",
           "image": "http:\/\/saidad.oss-cn-guangzhou.aliyuncs.com\/image\/0b9709b4490830a47ad5b370b6a696ca.jpeg",
           "type": "image"
         }]
       },
       "success": true
     }
   
     response.json(result)
   }
   
   
   /**
    * @desc 处理获取 数据
    * @param { object } request express 请求对象
    * @param { object } response express 响应对象
    * @returns { object } json 对象
    */
    const getProductList = (request, response) => {
      console.log('request', request)
     let list = [
       {
         "base_info": {
           "product_name": "进口花伴手礼小花束",
           "publish_status": "1",
           "summary": "进口花伴手礼小花束",
           "product_type": 2,
           "stock": 99996,
           "sale": 7,
           "sale_price": 25800,
           "format_sale_price": "258.00",
           "original_price": 29800,
           "format_original_price": "298.00",
           "shipping_price": 0,
           "format_shipping_price": "0.00",
           "updated_timestamp": null,
           "created_timestamp": 1610858927,
           "item_id": 378,
           "sku_id": 0,
           "sort": 37,
           "main_image": "http:\/\/saidad.oss-cn-guangzhou.aliyuncs.com\/image\/eb209ef395fe09dc0db6a36ba2c2a5ca.jpeg"
         },
         "specifications": null,
         "galley_image_list": null,
         "brand_story": null,
         "care_instructions": null,
         "special_note": null,
         "logistics_desc": null,
         "after_sale_instructions": null,
         "purchase_note": null,
         "detail": null
       }, {
       "base_info": {
         "product_name": "年宵花水泥盆蝴蝶兰设计",
         "publish_status": "1",
         "summary": "年宵花水泥盆蝴蝶兰设计",
         "product_type": 2,
         "stock": 99997,
         "sale": 4,
         "sale_price": 52000,
         "format_sale_price": "520.00",
         "original_price": 68000,
         "format_original_price": "680.00",
         "shipping_price": 0,
         "format_shipping_price": "0.00",
         "updated_timestamp": null,
         "created_timestamp": 1612086744,
         "item_id": 393,
         "sku_id": 0,
         "sort": 36,
         "main_image": "http:\/\/saidad.oss-cn-guangzhou.aliyuncs.com\/image\/7f0008089c9174ee43c81af2a25ce788.jpeg"
       },
       "specifications": null,
       "galley_image_list": null,
       "brand_story": null,
       "care_instructions": null,
       "special_note": null,
       "logistics_desc": null,
       "after_sale_instructions": null,
       "purchase_note": null,
       "detail": null
     }, {
       "base_info": {
         "product_name": "紫色恋人",
         "publish_status": "1",
         "summary": "紫色恋人",
         "product_type": 2,
         "stock": 99999,
         "sale": 14,
         "sale_price": 128000,
         "format_sale_price": "1280.00",
         "original_price": 158000,
         "format_original_price": "1580.00",
         "shipping_price": 0,
         "format_shipping_price": "0.00",
         "updated_timestamp": null,
         "created_timestamp": 1612085138,
         "item_id": 388,
         "sku_id": 0,
         "sort": 36,
         "main_image": "http:\/\/saidad.oss-cn-guangzhou.aliyuncs.com\/image\/2b758d13177021042ea23a60393a36d4.jpeg"
       },
       "specifications": null,
       "galley_image_list": null,
       "brand_story": null,
       "care_instructions": null,
       "special_note": null,
       "logistics_desc": null,
       "after_sale_instructions": null,
       "purchase_note": null,
       "detail": null
     }, {
       "base_info": {
         "product_name": "情人节圆筒礼盒",
         "publish_status": "1",
         "summary": "情人节圆筒礼盒",
         "product_type": 2,
         "stock": 99999,
         "sale": 13,
         "sale_price": 39800,
         "format_sale_price": "398.00",
         "original_price": 52000,
         "format_original_price": "520.00",
         "shipping_price": 0,
         "format_shipping_price": "0.00",
         "updated_timestamp": null,
         "created_timestamp": 1611829185,
         "item_id": 387,
         "sku_id": 0,
         "sort": 36,
         "main_image": "http:\/\/saidad.oss-cn-guangzhou.aliyuncs.com\/image\/4d76f0d2d283c8ffdd6c7da7f6a8e4c0.jpeg"
       },
       "specifications": null,
       "galley_image_list": null,
       "brand_story": null,
       "care_instructions": null,
       "special_note": null,
       "logistics_desc": null,
       "after_sale_instructions": null,
       "purchase_note": null,
       "detail": null
     }, {
       "base_info": {
         "product_name": "巨型亚克力枪炮礼盒",
         "publish_status": "1",
         "summary": "巨型亚克力枪炮礼盒",
         "product_type": 2,
         "stock": 99999,
         "sale": 12,
         "sale_price": 158000,
         "format_sale_price": "1580.00",
         "original_price": 188000,
         "format_original_price": "1880.00",
         "shipping_price": 0,
         "format_shipping_price": "0.00",
         "updated_timestamp": null,
         "created_timestamp": 1611828887,
         "item_id": 386,
         "sku_id": 0,
         "sort": 36,
         "main_image": "http:\/\/saidad.oss-cn-guangzhou.aliyuncs.com\/image\/7a2bf6c3bea5d13809630bdb11a2534f.jpeg"
       },
       "specifications": null,
       "galley_image_list": null,
       "brand_story": null,
       "care_instructions": null,
       "special_note": null,
       "logistics_desc": null,
       "after_sale_instructions": null,
       "purchase_note": null,
       "detail": null
     }, {
       "base_info": {
         "product_name": "透视亚克力a级玫瑰花盒",
         "publish_status": "1",
         "summary": "透视亚克力a级玫瑰花盒",
         "product_type": 2,
         "stock": 99999,
         "sale": 11,
         "sale_price": 39800,
         "format_sale_price": "398.00",
         "original_price": 52000,
         "format_original_price": "520.00",
         "shipping_price": 0,
         "format_shipping_price": "0.00",
         "updated_timestamp": null,
         "created_timestamp": 1611827886,
         "item_id": 385,
         "sku_id": 0,
         "sort": 36,
         "main_image": "http:\/\/saidad.oss-cn-guangzhou.aliyuncs.com\/image\/95f27ba930360fc394c32f1491c94b74.jpeg"
       },
       "specifications": null,
       "galley_image_list": null,
       "brand_story": null,
       "care_instructions": null,
       "special_note": null,
       "logistics_desc": null,
       "after_sale_instructions": null,
       "purchase_note": null,
       "detail": null
     }
     ]
   
     let result = {
       "errorCode": 0,
       "errorMessage": "success",
       "data": {
         "product_list": list,
         "page_info": {
           "page_size": 10,
           "index": 1,
           "has_more": true,
           "count": 10
         }
       },
       "success": true
     }
     response.json(result)
   }
   // home Mock api
   const HomeMockApi = (app) => {
     app.post('/mock/adverising/getAdvertisingList', getAdverising)
     app.post('/mock/product/getProductLisgt', getProductList)
   }
   
   
   module.exports = HomeMockApi
   
   ```

4. 在`src/` 目录下新建`vue.config.js`文件，配置`devsever`

   ```javascript
   // 导入mock文件
   const HomeMockApi = require('./src/mock/home')
   
   module.exports = {
     devServer: {
       before(app, /*server, compiler */) {
         // 首页相关mock接口 注入
         HomeMockApi(app)
       }
     }
     
   // 注意：所有的mock文件必须通过require引入，这里的加载是通过node引入的，所有es6的import不可用
   ```



## axios 封装

1. 安装`axios`

   > `npm i axios -s `
   >
   > or
   >
   > `yarn add axios`

2. 在 `src/utils/` 目录下新建 `request.js`

3. 在`src/urils` 新建`config.js`文件，并将常用变量名抽离放在此处

   ```javascript
   export const REJIECTURL = 'REJIECTURL' // 重定向url key
   export const TOKENKEY = 'TOKENKEY' // token key
   export const USERINFO = 'USERINFO' // 用户信息 localstoragekey
   ```

   

4. axios 封装

   ```javascript
   import axios from 'axios'
   import { Toast } from 'vant' // 引入Toast组件，用于错误提示
   import * as sysConfig from './config'
   
   const timeout = 60000 // 超时时间 默认1分钟
   // 设置默认请求url
   // 这里如果别的地方也会用到改变量，就把他配置到 src/config.js 中去
   const baseURL = 'http://localhost:8080' 
   let request = axios.create({
     timeout,
     baseURL
   })
   // 添加token
   const addToken = config => {
     let token = localStorage.getItem(sysConfig.TOKENKEY)
     // 添加token值请求头
     config.headers.Authorization = `Bearer ${token}`
     return config
   }
   // 添加公共参数
   const addParams = config => {
     let userId = 'userId' // 用户id
     let deviceId = 'h5' // 设备类型
     // 公用参数对象
     let params = {
       userId,
       deviceId
     }
   
     let key = config.method == 'post' ? 'data' : 'params'
     // 参数拼接
     config[key] = {
       ...config[key],
       ...params
     }
     
     return config
   }
   // 请求前的处理
   request.interceptors.request.use(config => {
     return Promise.resolve(config)
     .then(addToken)
     .then(addParams)
   })
   /**
    * @desc 检测请求状态
    * @param {*} response 
    * @returns 
    */
   const checkNetWorkStatus = response => {
     console.log('response', response)
     let {
       status,
       message
     } = response
     const errorCodes = [404, 403, 500, 502, 405]
     // 请求结果错误 提示用户
     if (errorCodes.includes(status)) {
       Toast({
         type: 'fail',
         message
       })
     }
     
     // 
     return response
   }
   
   // 清除登录信息
   const clearLoginInfo = () => {
     // 需要清理的缓存的key
     const keys = [
       sysConfig.TOKENKEY,
       'userId'
     ]
     // 遍历清除缓存的用户信息
     keys.map(key => localStorage.removeItem(key))
   }
   // 检测请求数据
   const checkCode = response => {
     let { errorCode, errorMessage } = response.data
     // 检查请求状态是否正常
     if (errorCode !== 0) {
       Toast({
         type: 'fail',
         message: errorMessage
       })
     }
     // 登录信息失效，需要重新登录
     let codes = [401, 403]
     // 登录 失效检测
     if (codes.includes(errorCode)) {
       clearLoginInfo()
       // 保存当前页面路由 用户登录后使用
       sessionStorage.setItem(sysConfig.REJIECTURL, location.href)
       // 重定向至登录页面 
       // router.push('/login')
     }
     return response
   }
   // 响应处理
   request.interceptors.response.use(response => {
     return Promise.resolve(response)
       .then(checkNetWorkStatus)
       .then(checkCode)
       .then(response => response.data)
   })
   
   // 导出 axios 实例
   export default request
   
   
   ```

   