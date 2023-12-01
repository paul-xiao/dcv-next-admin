<template>
  <div id="stage" style="width: 100%; height: 100%; position: relative"></div>
</template>
<script lang="ts" setup>
  import * as d3 from 'd3';
  import * as THREE from 'three';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
  import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
  import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
  import Stats from 'three/examples/jsm/libs/stats.module';
  import { loadSvg, projection } from './helpers';
  let controls, renderer, scene, camera, stats, domEl;
  function mian() {
    // dom

    domEl = document.getElementById('stage');
    if (!domEl) return;
    //创建渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(domEl.clientWidth, domEl.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('#fff', 1);
    domEl?.appendChild(renderer.domElement);

    //创建场景
    scene = new THREE.Scene();

    //创建相机
    camera = new THREE.PerspectiveCamera(50, domEl.clientWidth / domEl.clientHeight, 0.1, 100000);
    camera.position.z = 600; //设置相机位置
    camera.position.y = 600; //设置相机位置
    scene.add(camera);

    // 性能监控
    stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    domEl.appendChild(stats.dom);
    // scene.add(stats);

    // {
    //   // Shape表示一个平面多边形轮廓
    //   const shape = new THREE.Shape([
    //     // 按照特定顺序，依次书写多边形顶点坐标
    //     new THREE.Vector2(-50, -50), //多边形起点
    //     new THREE.Vector2(-50, 50),
    //     new THREE.Vector2(50, 50),
    //     new THREE.Vector2(50, -50),
    //   ]);

    //   //拉伸造型
    //   const geometry = new THREE.ExtrudeGeometry(
    //     shape, //二维轮廓
    //     {
    //       depth: 20, //拉伸长度
    //     },
    //   );
    //   const material = new THREE.MeshNormalMaterial();

    //   const mesh = new THREE.Mesh(geometry, material);

    //   scene.add(mesh);
    // }

    // 添加点光源
    let light1 = new THREE.PointLight('#fff');
    light1.position.set(0, 1160, 22160);
    scene.add(light1);

    // 添加环境光
    let ambient = new THREE.AmbientLight('#999');
    scene.add(ambient);

    // 添加辅助线
    let axisHelper = new THREE.AxesHelper(500);
    scene.add(axisHelper);

    // 网格辅助线
    const helper = new THREE.GridHelper(4000, 30, 0x323246, 0x323246);
    scene.add(helper);

    //

    const sphere = new THREE.SphereGeometry();
    const object = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial(0xff0000));
    const box = new THREE.BoxHelper(object, 0xffff00);
    scene.add(box);
    // 摄像机辅助
    const chelper = new THREE.CameraHelper(camera);
    scene.add(chelper);

    // 创建控制器
    controls = new OrbitControls(camera, renderer.domElement);

    // 加载svg地图

    addSvgMap();

    // 添加正方形

    // addBox();

    // 计算坐标

    //发起渲染
    render();
  }

  async function addSvgMap() {
    const data: any = await loadSvg('/svg/china.svg');

    const paths = data.paths;

    const group = new THREE.Group();

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      // 生成轮廓线
      const points: any[] = [];
      const curPoint = path.currentPath.curves;
      curPoint.forEach(c => {
        points.push(new THREE.Vector3(c.v1.x, c.v1.y, -1));
      });
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      let lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const line = new THREE.Line(geometry, lineMaterial);
      group.add(line);

      const material = new THREE.MeshBasicMaterial({
        color: path.color,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

      const shapes = SVGLoader.createShapes(path);

      for (let j = 0; j < shapes.length; j++) {
        const shape = shapes[j];
        const geometry = new THREE.ShapeGeometry(shape);
        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
      }
    }

    // 创建一个新的变换矩阵
    var matrix = new THREE.Matrix4();
    matrix.makeRotationX(Math.PI / 2);

    // 应用变换矩阵到物体上
    group.applyMatrix4(matrix);

    // group.geometry.computeBoundingBox()

    // 居中

    const box3 = new THREE.Box3();
    box3.expandByObject(group);
    const center = new THREE.Vector3();
    box3.getCenter(center);

    group.position.x = -center.x;
    group.position.z = -center.z;
    console.log(center);

    addSphere(group);

    // 加载散点
    addPonit(group, [104.0, 37.5]);
    addPonit(group, [104.0, 30.5]);
    addText(group, [104.0, 30.5], 'Hola!');

    scene.add(group);
  }

  function addPonit(group, croods) {
    var geometry = new THREE.BoxGeometry(1, 1, 1); //创建一个立方体几何对象Geometry
    // 点渲染模式
    var material = new THREE.PointsMaterial({
      color: 0xff0000,
      size: 30, //点对象像素尺寸
    }); //材质对象
    var points = new THREE.Points(geometry, material); //点模型对象
    const { x, y } = projection(group, croods);
    points.position.x = x;
    points.position.y = y;

    group.add(points);
  }

  function addBox() {
    // 创建一个正方形几何体
    var geometry = new THREE.BoxGeometry(50, 50, 50); // 宽、高和深分别为1的正方形

    // 创建一个材质
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // 创建一个网格（mesh），将几何体和材质组合起来
    var cube = new THREE.Mesh(geometry, material);
    cube.position.y = 25;

    // 将网格添加到场景中
    scene.add(cube);
  }

  // 球形
  function addSphere(group) {
    const geometry = new THREE.SphereGeometry(15, 15, 15);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    // center 104.0, 37.5
    // cd 104.07274 , 30.57899
    // bj 116.41339 , 39.91092
    const { x, y } = projection(group, [116.41339, 39.91092]);
    sphere.position.x = x;
    sphere.position.y = y;
    console.warn(x, y);

    // 自定义投影规则
    //proj4.defs([["EPSG:4549","+proj=tmerc +lat_0=0 +lon_0=0 +k=1 +x_0=1000 +y_0=0 +ellps=GRS80 +units=m +no_defs"]])
    group.add(sphere);
  }

  // 文本

  function addText(group, croods, text) {
    const loader = new FontLoader();
    loader.load('/fonts/SJdianhei-zhong_Regular.json', function (font) {
      const textGeometry = new TextGeometry(text, {
        font: font,
        size: 20,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const mesh = new THREE.Mesh(textGeometry, textMaterial);
      const { x, y } = projection(group, croods);
      // Adjust the position of the text here
      mesh.position.set(x, y, 0);
      mesh.rotation.x = Math.PI; // 翻转180度

      group.add(mesh);
    });
  }

  var lastTime = Date.now();
  var fps = 30; // 设置你想要的刷新率
  //渲染函数
  function render() {
    var now = Date.now();
    var delta = now - lastTime;

    // 只有在时间间隔达到1/fps毫秒时才更新画面
    if (delta > 1000 / fps) {
      // 在这里更新你的画面
      lastTime = now;
      controls.update(); // Update controls

      stats.update(); // 更新性能数据

      // shaderMaterial.uniforms.u_time += 0.01; // 更新时间 uniform
      //渲染场景
      renderer.render(scene, camera);
    }

    requestAnimationFrame(render);
  }

  onMounted(() => {
    mian();
  });
</script>
