import * as THREE from 'three';

import vertexShader from './vertex.glsl?raw';
import fragmentShader from './fragment.glsl?raw';

export default (context) => {
  const box = context.container.getBoundingClientRect();
  const material = new THREE.ShaderMaterial({
    uniforms: {
      resolution: {
        value: new THREE.Vector2(box.width, box.height),
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
