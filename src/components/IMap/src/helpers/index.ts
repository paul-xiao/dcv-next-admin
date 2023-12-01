import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import proj4 from 'proj4';
/**
 * +proj: 用于指定投影类型。常见的投影类型包括：
    merc：墨卡托投影（Mercator Projection）
    utm：统一横墨卡托投影（Universal Transverse Mercator Projection）
    stere：正交投影（Oblique Stereographic Projection）
    azimuthal：方位投影（Azimuthal Projection）
    等角：等角投影（Isometric Projection）
    笛卡尔：笛卡尔投影（Cartesian Projection）
 * +lon_0 和 +lat_0：用于指定经度和纬度的原点。这些值通常是基于特定地区的中心经度和中心纬度来设置的。

 * +x_0 和 +y_0：用于指定平面坐标的原点。这些值通常是根据地图的尺寸和比例尺来设置的。

 * +units：用于指定输出坐标的单位。常见的单位包括米（m）、千米（km）、英尺（ft）等。

 * +datum：用于指定地图所使用的椭球体或参考椭球体。常见的椭球体包括WGS84、GRS80等。

 * +to_meter：用于指定转换到米为单位的比例因子。例如，如果1单位长度等于100米，则可以将+to_meter参数设置为100。

 * +vunits：用于指定垂直坐标的单位。这个参数通常与+units参数一起使用，以确保水平和垂直坐标单位的一致性。
 */
function Wgs84ToMector2([lon, lat]) {
  var fromProjection = '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs';

  // const projection = '+proj=merc +lon_0=108.55 +lat_0=34.42 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=km +no_defs';
  // const projection = '+proj=longlat +ellps=GRS80 +no_defs';
  const projection = '+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=500000 +y_0=0 +ellps=krass +units=m +no_defs ';
  return proj4(fromProjection, projection, [lon, lat]);
}
export function loadSvg(url) {
  return new Promise((resolve, reject) => {
    const svgLoader = new SVGLoader();
    svgLoader.load(
      url,
      function (svg) {
        resolve(svg);
      }, // called when loading is in progresses
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      // called when loading has errors
      function (error) {
        console.log('An error happened', error);
        reject(error);
      },
    );
  });
}
/**
 * @description 经纬度转坐标
 * @param coords 经纬度
 * @param center 中心点经纬度
 * @return [x,y]
 */
export function coordsToxy(coords, center = [104.0, 37.5]) {
  const [lat2, lon2] = coords;
  const [lat1, lon1] = center;
  const x1 = 0;
  const y1 = 0;
  let a, dst;
  let north = new THREE.Vector2(0, 1);
  let arc = 6371.393 * 1000;
  a = Math.atan(((lon2 - lon1) / (lat2 - lat1)) * Math.cos(lat1));
  dst = ((lat2 - lat1) * ((arc * 2 * Math.PI) / 360)) / Math.cos(a);
  let b = north.angle() - a;
  console.log(a, b, north.angle());

  return [Math.cos(b) * dst + x1, Math.sin(b) * dst + y1];
}

export function createSideShaderMaterial(material) {
  material.onBeforeCompile = function (shader, renderer) {
    // console.log(shader.fragmentShader);
    shader.vertexShader = shader.vertexShader.replace('void main() {', 'varying vec4 vPosition;\nvoid main() {');
    shader.vertexShader = shader.vertexShader.replace(
      '#include <fog_vertex>',
      '#include <fog_vertex>\nvPosition=modelMatrix * vec4( transformed, 1.0 );',
    );

    shader.fragmentShader = shader.fragmentShader.replace('void main() {', 'varying vec4 vPosition;\nvoid main() {');

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <transmissionmap_fragment>',
      `
      #include <transmissionmap_fragment>
      float z = vPosition.z;
      float s = step(2.0,z);
      vec3 bottomColor =  vec3(.0,1.,1.0);
    
      diffuseColor.rgb = mix(bottomColor,diffuseColor.rgb,s);
      // float r =  abs( 1.0 * (1.0 - s) + z  * (0.0  - s * 1.0) + s * 4.0) ;
      float r =  abs(z  * (1.0  - s * 2.0) + s * 4.0) ;
      diffuseColor.rgb *= pow(r, 0.5 + 2.0 * s);
      
      // float c = 
    `,
    );
  };

  return material;
}

/**
 * @description:
 * @param {*} longitude
 * @param {*} latitude
 * @param {*} zoom
 * @param {*} bounds
 * @return {*}
 */
export function convertCoordsToSVG(longitude, latitude, zoom, bounds) {
  // 将经纬度转换为弧度
  var lonRad = longitude * (Math.PI / 180);
  var latRad = latitude * (Math.PI / 180);

  // 计算缩放级别和像素大小
  var scaleX = Math.pow(2, zoom);
  var scaleY = Math.pow(2, zoom);
  var pixelSizeX = 1 / scaleX;
  var pixelSizeY = 1 / scaleY;

  // 计算边界框的中心点
  var centerX = (bounds[2] + bounds[0]) / 2;
  var centerY = (bounds[3] + bounds[1]) / 2;

  // 使用双线性插值计算像素坐标
  var x0 = Math.floor(centerX - lonRad * pixelSizeX);
  var y0 = Math.floor(centerY - latRad * pixelSizeY);
  var x1 = Math.floor(centerX + lonRad * pixelSizeX);
  var y1 = Math.floor(centerY + latRad * pixelSizeY);

  // 计算经纬度对应的像素坐标
  var x = Math.round(lonRad * pixelSizeX + centerX);
  var y = Math.round(latRad * pixelSizeY + centerY);

  return { x: x1, y: y0 };
}
/**
 * 双线性插值
 * @param sw 目标矩阵的宽度
 * @param sh 目标矩阵的高度
 * @param x_ 目标矩阵中的x坐标
 * @param y_ 目标矩阵中的y坐标
 * @param data 源数据矩阵（二维数组）
 */

export function interpolation(sw, sh, x_, y_, data) {
  let t1 = new Date().getTime();
  let w = data[0].length;
  let h = data.length;
  let x = ((x_ + 0.5) * w) / sw - 0.5;
  let y = ((y_ + 0.5) * h) / sh - 0.5;
  let x1 = Math.floor(x);
  let x2 = Math.floor(x + 0.5);
  let y1 = Math.floor(y);
  let y2 = Math.floor(y + 0.5);
  x1 = x1 < 0 ? 0 : x1;
  y1 = y1 < 0 ? 0 : y1;
  x1 = x1 < w - 1 ? x1 : w - 1;
  y1 = y1 < h - 1 ? y1 : h - 1;
  x2 = x2 < w - 1 ? x2 : w - 1;
  y2 = y2 < h - 1 ? y2 : h - 1; // 取出原矩阵中对应四个点的值
  let f11 = data[y1][x1];
  let f21 = data[y1][x2];
  let f12 = data[y2][x1];
  let f22 = data[y2][x2]; // 计算该点的值
  let xm = x - x1;
  let ym = y - y1;
  let r1 = (1 - xm) * f11 + xm * f21;
  let r2 = (1 - xm) * f12 + xm * f22;
  let value = (1 - ym) * r1 + ym * r2;
  return value;
}
/**
 * @description:
 * @param {*} mesh
 * @param {Array} coords
 * @return {*}
 */
export function projection(mesh, coords) {
  const boundingBox = new THREE.Box3();
  boundingBox.setFromObject(mesh);

  const low = boundingBox.min;
  const high = boundingBox.max;
  console.log('low:', low);
  console.log('high:', high);

  const bounds: any = [
    [73.554302, 18.15506],
    [134.775703, 53.56178],
  ];
  const srcBoundaries = {
    lon_min: bounds[0][0],
    lat_min: bounds[0][1],
    lon_max: bounds[1][0],
    lat_max: bounds[1][1],
  };

  console.log(srcBoundaries);
  // todo: 如何正确的计算投影
  const mapBoundaries = {
    xmin: 0,
    ymin: 0,
    xmax: high.x - low.x,
    ymax: high.z - low.z,
  };
  // const mapBoundaries = {
  //   xmin: low.x,
  //   ymin: low.z,
  //   xmax: high.x,
  //   ymax: high.z,
  // };
  console.log(mapBoundaries);

  // 计算经纬度相对于其最小值的偏移量
  let lon_relative = coords[0] - srcBoundaries.lon_min;
  let lat_relative = coords[1] - srcBoundaries.lat_min;

  // 计算经纬度范围
  let lon_range = srcBoundaries.lon_max - srcBoundaries.lon_min;
  let lat_range = srcBoundaries.lat_max - srcBoundaries.lat_min;

  // 计算把经纬度偏移量映射到平面坐标系上的比例
  let x_scale = (mapBoundaries.xmax - mapBoundaries.xmin) / lon_range;
  let y_scale = (mapBoundaries.ymax - mapBoundaries.ymin) / lat_range;

  // 应用比例计算出平面坐标系中的坐标
  let x = lon_relative * x_scale + mapBoundaries.xmin;
  let y = lat_relative * y_scale + mapBoundaries.ymin;
  // offset
  y = mapBoundaries.ymax - y + 25;
  return { x, y };
}
