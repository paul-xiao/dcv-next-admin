const proj4 = require('proj4');

// 定义中国地图的投影规则
const projection = '+proj=merc +lon_0=105 +lat_1=25 +k=1 +x_0=0 +y_0=0 +datum=krass +units=m +no_defs';

// 定义经纬度坐标
const lon = 73.554302; // 经度
const lat = 18.15506; // 纬度

// 将经纬度坐标转换为平面坐标
const [x, y] = proj4(projection, [lon, lat]);

console.log('平面坐标:', [x, y]);
