/**
 * @param type disk | bandwidth
 * @param value Number类型，数据大小
 * @description 根据disk(B)和bandwidth(bps)，返回对应单位unit以及大小val
 **/
export function getUnit(type, value) {
    const map = {
      oss: ['KB', 'MB', 'GB'],
      disk: ['GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      bandwidth: ['Mbps', 'Gbps', 'Tbps', 'Pbps', 'Ebps', 'Zbps', 'Ybps']
    }
    const sizes = map[type]
    const k = 1024 // TODO:这里有问题，bps应该是1000进制，不是1024
    const i = Math.floor(Math.log(value) / Math.log(k))
    return {
      val: value < 1024 ? value : (value / Math.pow(k, i)).toPrecision(3),
      unit: isFinite(i) ? sizes[i] : sizes[0]
    }
  }