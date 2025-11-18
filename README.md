# FaceTracking
## AIM:
To implement a real-time face tracking AR system using MindAR and Three.js, where a 3D face mesh is overlaid with a texture (face mask) that moves dynamically according to the user’s face.

## ALGORITHM:
Step 1: Initialize MindAR for face tracking.

Step 2: Create scene, camera, and renderer.

Step 3: Add a hemisphere light to illuminate the 3D scene.

Step 4: Add a face mesh using addFaceMesh() to map facial features.

Step 5: Load face mask texture using loadTexture().

Step 6: Apply the texture to the face mesh and enable transparency.

Step 7: Add the textured face mesh to the scene.

Step 8: Start MindAR tracking with mindarThree.start().

Step 9: In the animation loop, continuously render the scene and update the mesh according to face movement.

## Index.html



```html
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="./libs/mindar/mindar-face-three.prod.js"></script>
        <script src="./main.js" type="module"></script>
        <style>
            html,body {
                position: relative;
                margin: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        </style>
        <link rel="icon" href="data:,">
    </head>
    <body>
    </body>
</html>
```

## main.js for mask:
```js
import {loadGLTF, loadTexture} from "./libs/loader.js";
const THREE = window.MINDAR.FACE.THREE;
document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.FACE.MindARThree({
      container: document.body,
      maxTrack: 1,
    });
    const {renderer, scene, camera} = mindarThree;
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);
const faceMesh = mindarThree.addFaceMesh();
const texture = await loadTexture('./asserts/facemesh/face-mask-texture/Face_Mask_Template.png');
faceMesh.material.map = texture;
faceMesh.material.transparent = true;
faceMesh.material.needsUpdate = true;
scene.add(faceMesh);
    
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});

```

## main.js for glass:
```js
import {loadGLTF, loadTexture} from "./libs/loader.js";
const THREE = window.MINDAR.FACE.THREE;
document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.FACE.MindARThree({
      container: document.body,
      maxTrack: 1, 
    });
    const {renderer, scene, camera} = mindarThree;
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);
   
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


```
## OUTPUT:

<img width="1920" height="1080" alt="Screenshot 2025-10-07 094126" src="https://github.com/user-attachments/assets/8ac1b791-12e7-46e1-9210-1bdefa54012f" />


![WhatsApp Image 2025-11-18 at 18 30 09_9e00aa50](https://github.com/user-attachments/assets/40f7ea63-1595-4c6f-945b-f580daeb7e8e)

## RESULT:
The system tracks the user’s face in real time and displays a face mask texture that moves along with the face.

