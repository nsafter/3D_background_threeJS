import * as THREE from "three";
import "./style.css";

const container = document.querySelector(".three_bg");

const loader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGL1Renderer();

renderer.setSize(window.innerWidth, window.innerHeight);

container.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(16, 8, 10, 9);
const material = new THREE.MeshBasicMaterial({
  map: loader.load("./img/img" + Math.floor(Math.random() * 6 + 1) + ".jpg"),
    //map: loader.load("https://picsum.photos/3000/3000"),
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

camera.position.z = 5;

const count = geometry.attributes.position.count;
const clock = new THREE.Clock();

function animate() {
  const time = clock.getElapsedTime();
  for (let i = 0; i < count; i++) {
    const x = geometry.attributes.position.getX(i);
    // const y = geometry.attributes.position.getY(i);
    const anim1 = 0.25 * Math.sin(x + time * 2 + 15);
    // const anim2 = 0.25 * Math.sin(y + time + 0.5);

    geometry.attributes.position.setZ(i, anim1);
    geometry.computeVertexNormals();
    // geometry.attributes.position.setZ(i, anim2);
    geometry.attributes.position.needsUpdate = true;
  }

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
