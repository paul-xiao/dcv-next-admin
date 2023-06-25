import { MockMethod } from 'vite-plugin-mock'
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
]
export default mockList
