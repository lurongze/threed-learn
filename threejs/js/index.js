// 点击事件https://blog.csdn.net/qq_30100043/article/details/79054862
console.log("error message");
var pointStartX = 0;
var pointEndX = 0;
var pointStartY = 0;
var pointEndY = 0;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var renderer = new THREE.WebGLRenderer({
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 1.5, 1);
var material = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
});
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);
var color = new THREE.Color(0xff0000);
for (let i = 0; i < 100; i++) {
  let met = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  let colorArray = new Float32Array([
    Math.random(),
    Math.random(),
    Math.random(),
  ]);
  let mat = new THREE.MeshBasicMaterial({
    color: color.fromArray(colorArray),
  });
  let item = new THREE.Mesh(met, mat);
  item.position.x = Math.random() * 3 * (i % 7 === 0 ? -1 : 1);
  item.position.y = Math.random() * 3 * (i % 3 === 0 ? -1 : 1);
  item.position.z = Math.random() * 3 * (i % 4 === 0 ? -1 : 1);
  item.rotation.x = Math.random() * 3;
  item.rotation.y = Math.random() * 3;
  item.rotation.z = Math.random() * 3;
  scene.add(item);
}

// var axis = new THREE.AxisHelper(800);
// scene.add(axis);

camera.position.z = 5;

var render = function () {
  requestAnimationFrame(render);

  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;
  // cube.rotation.z += 0.1;

  renderer.render(scene, camera);
};

render();

function onMouseClick(event) {
  //通过鼠标点击的位置计算出raycaster所需要的点的位置，以屏幕中心为原点，值的范围为-1到1.
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  console.log(
    "onMouseClick",
    event.clientX,
    event.clientY,
    window.innerWidth,
    window.innerHeight
  );

  // 通过鼠标点的位置和当前相机的矩阵计算出raycaster
  raycaster.setFromCamera(mouse, camera);

  // 获取raycaster直线和所有模型相交的数组集合
  var intersects = raycaster.intersectObjects(scene.children);

  console.log(intersects);

  //将所有的相交的模型的颜色设置为红色，如果只需要将第一个触发事件，那就数组的第一个模型改变颜色即可
  // for ( var i = 0; i < intersects.length; i++ ) {
  //
  //   if( i < 1 ) {
  //     intersects[ i ].object.material.color.set( 0xff0000 );
  //   }
  //
  // }
  if (intersects && intersects.length > 0) {
    intersects[0].object.material.color.set(0xff0000);
  }
}

function touchStart(e) {
  console.log("touchStart", e);
}
window.addEventListener("click", onMouseClick, false);
window.addEventListener("mousedown", touchStart, false);
