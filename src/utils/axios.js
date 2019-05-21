import axios from 'axios';
const service = axios.create({
  timeout: 30000 // 请求超时时间
})
export function get(url, params = {}) {
  params.t = new Date().getTime();
  return service({
    url: url,
    method: 'get',
    headers: {},
    params
  })
}

export {
  service
}