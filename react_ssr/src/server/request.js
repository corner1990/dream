import axios from 'axios'
// 创建一个axios的实例， 配置baseURL的基准路径
// 服务器端访问的时候访问4001
export default (ctx) => axios.create({
  baseURL: 'http://localhost:4001',
  headers: {
    cookie: ctx.req.headers.cookie || '' // 从请求中拿到cookie
  }
})