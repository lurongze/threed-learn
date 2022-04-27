import * as THREE from "three";
import * as OrbitControls from "three/examples/jsm/controls/OrbitControls";
import * as GTLF from "three/examples/jsm/loaders/GLTFLoader";

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1.0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

let i = 0;
const points = [];
points.push(new THREE.Vector3(- 10, 0, i * 1));
points.push(new THREE.Vector3(0, 10, i * 1));
points.push(new THREE.Vector3(10, 0, i * 1));
points.push(new THREE.Vector3(0, -10, i * 1));
points.push(new THREE.Vector3(-10, 0, i * 1));
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);

scene.add(line);

var axes = new THREE.GridHelper();
scene.add(axes);

const controls = new OrbitControls.OrbitControls(camera, renderer.domElement);

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 20, 100);
controls.update();

// renderer.render(scene, camera);

const loader = new THREE.ObjectLoader();
// const loader = new THREE.Loader
let naiyaziObj = null;
loader.load(
	// 资源的URL
	// "./naiyazi.json",
	"./men.glb",

	// onLoad回调
	// Here the loaded data is assumed to be an object
	function (obj) {
		// Add the loaded object to the scene
		naiyaziObj = obj;
		scene.add(obj);
	},

	// onProgress回调
	function (xhr) {
		// console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
		console.log("xhr", xhr);
	},

	// onError回调
	function (err) {
		console.error('An error happened');
	}
);

let x = 0;
// let modelX = 0;

function animate() {

	requestAnimationFrame(animate);

	// x = x + 0.001;
	x = x + Math.PI / 360000;
	line.rotateY(x);
	line.rotateX(x);
	line.rotateZ(x);
	if (naiyaziObj) {
		naiyaziObj.rotateY(x);
	}
	// line.translateX(x);
	// required if controls.enableDamping or controls.autoRotate are set to true
	// controls.update();
	renderer.render(scene, camera);

}

animate();