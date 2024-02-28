import http from '@/utils/http'

export const upload = (data: any) => {
  if(!data.file) return
  const formdata = new FormData()
  formdata.append('file', data.file)
  return defHttp.post(`/upload`, formdata)
}
