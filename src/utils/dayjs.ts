import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)

export function fromNow(date: string | number | Date | dayjs.Dayjs | null | undefined) {
  return dayjs(date).locale('zh-cn').fromNow()
}
export function format(date: string | number | Date | dayjs.Dayjs | null | undefined, formatString: string) {
  return dayjs(date).locale('zh-cn').format(formatString)
}