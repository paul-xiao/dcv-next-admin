import { MockMethod } from 'vite-plugin-mock'
import menuData from './data/menu'
const mockList: MockMethod[] = [
  {
    url: '/mock/login',
    method: 'post', // 请求方式
    statusCode: 200, // 返回的http状态码
    response: opt => {
      console.log(opt)

      return {
        // 返回的结果集
        statusCode: 200,
        desc: '登录成功',
        result: {
          name: 'lxl',
        },
      }
    },
  },
  {
    url: '/menu/list',
    method: 'get', // 请求方式
    statusCode: 200, // 返回的http状态码
    response: opt => {
      console.log(opt)

      return {
        // 返回的结果集
        statusCode: 200,
        desc: '登录成功',
        result: menuData,
      }
    },
  },
]
export default mockList
