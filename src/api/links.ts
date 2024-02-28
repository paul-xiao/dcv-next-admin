import http from '@/utils/http'
export const list = (params: any = {}) => {
  return defHttp.get('/links/list', {
    params
  })
}
export const detail = (id: number) => {
  return defHttp.get(`/links/detail/${id}`)
}
export const create = (data: any) => {
  return defHttp.post('/links/create', data)
}
export const update = (data: any) => {
  return defHttpput('/links/update', data)
}
export const remove = (id: any) => {
  return defHttpdelete(`/links/delete/${id}`)
}
export const upload = (data: any) => {
  if(!data.file) return
  const formdata = new FormData()
  formdata.append('file', data.file)
  return defHttp.post(`/upload`, formdata)
}
