import * as THREE from 'three';

import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';

import windowsImage from './windows.webp';
import overlayImage from './overlay.png';

export default (context) => {
  const loader = new THREE.TextureLoader();
  const windowsTexture = loader.load(windowsImage);
  const overlayTexture = loader.load(overlayImage);
  const box = context.container.getBoundingClientRect();
  const material = new THREE.ShaderMaterial({
    uniforms: {
      resolution: {
        value: new THREE.Vector2(box.width, box.height),
      },
      diffuse: {
        value: windowsTexture,
      },
      overlay: {
        value: overlayTexture,
      },
      tint: {
        value: new THREE.Vector4(1, 0, 0, 1),
      },
    },
    vertexShader,
    fragmentShader,
  });

  const geometry = new THREE.PlaneGeometry(1, 1);

  const plane = new THREE.Mesh(geometry, material);
  plane.position.set(0.5, 0.5, 0);
  context.scene.add(plane);

  return material;
};
