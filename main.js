import {loadGLTF, loadTexture} from "./libs/loader.js";
const THREE = window.MINDAR.FACE.THREE;
document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.FACE.MindARThree({
      container: document.body,
      maxTrack: 1, // Track only 1 face
    });
    const {renderer, scene, camera} = mindarThree;
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);
/*
const faceMesh = mindarThree.addFaceMesh();
const texture = await loadTexture('./asserts/facemesh/face-mask-texture/Face_Mask_Template.png');
faceMesh.material.map = texture;
faceMesh.material.transparent = true;
faceMesh.material.needsUpdate = true;
scene.add(faceMesh);
*/    
const glasses = await loadGLTF('./asserts/models/glasses/scene.gltf');
glasses.scene.scale.multiplyScalar(0.01);
const anchor = mindarThree.addAnchor(168);
anchor.group.add(glasses.scene);

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
