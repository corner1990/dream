// 通过axios 拉取结果
const axios = require('axios')
const timeout = 50000
let request = axios.create({
  timeout,
  // baseURL
})
// 响应处理
request.interceptors.response.use(response => {
  return Promise.resolve(response)
    .then(response => response.data)
})
/**
 * @desc 下载repo
 */
const getRepoList = () => request.get('https://api.github.com/orgs/zhu-cli/repos')

/**
 * @desc 下载获取tags
 */
 const getRepoTags = repo => request.get(`https://api.github.com/repos/zhu-cli/${repo}/tags`)

module.exports = {
  getRepoList,
  getRepoTags
}