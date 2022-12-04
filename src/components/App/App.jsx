import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import MainLoop from 'mainloop.js';
import cx from 'classnames';

import { shaders } from '../../shaders';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import './App.css';

class ThreeHelper {
  constructor(container, shader) {
    this.container = container;
    this.renderer = new THREE.WebGLRenderer();
    // append the renderer to the container
    this.container.appendChild(this.renderer.domElement);
    // create the scene
    this.scene = new THREE.Scene();

    // create the camera
    this.camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 1000);
    this.camera.position.set(0, 0, 1);

    // setup the first shader
    this.setupShader(shader);

    // setup and start main loop
    MainLoop.setUpdate(this.update).start();

    // add window event listener
    window.addEventListener('resize', this.onWindowResize, false);

    // initally call update size
    this.onWindowResize();
  }
  destroy = () => {
    MainLoop.stop();
    MainLoop.setUpdate(undefined);

    // dispose the renderer
    this.renderer.dispose();
    // remove window event listener
    window.removeEventListener('resize', this.onWindowResize, false);
  };
  update = () => {
    try {
      this.renderer.render(this.scene, this.camera);
    } catch (e) {
      console.error(`MainLoop update failed; with error: ${e}`);
      MainLoop.stop();
    }
  };
  setupShader = (shader) => {
    try {
      this.material = shader.setup(this);
    } catch (e) {
      console.error(`Failed to setup shader ${shader.name}; with error: ${e}`);
    }
  };
  pause = () => {
    MainLoop.stop();
  };
  resume = () => {
    MainLoop.start();
  };
  onWindowResize = () => {
    const box = this.container.getBoundingClientRect();
    this.renderer.setSize(box.width, box.height);

    if (this.material) {
      this.material.uniforms.resolution.value = new THREE.Vector2(
        box.width,
        box.height
      );
    }
  };
}

export const App = () => {
  const helper = useRef();
  const container = useRef();
  const [shaderIndex, setShaderIndex] = useLocalStorage('shader-index', 0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    helper.current = new ThreeHelper(container.current, shaders[shaderIndex]);

    const handleWindowBlur = () => {
      helper.current.pause();
      setPaused(true);
    };

    const handleWindowFocus = () => {
      helper.current.resume();
      setPaused(false);
    };

    // add window event listeners
    window.addEventListener('blur', handleWindowBlur, false);
    window.addEventListener('focus', handleWindowFocus, false);

    return () => {
      // destroy helper element
      helper.current.destroy();

      // remove window event listeners
      window.removeEventListener('blur', handleWindowBlur, false);
      window.removeEventListener('focus', handleWindowFocus, false);

      // remove all child elements
      const parent = container.current;
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    };
  }, []);

  const handleRowClick = (index) => {
    if (shaderIndex !== index) {
      setShaderIndex(index);
      helper.current.setupShader(shaders[index]);
    }
  };

  return (
    <div className="p-5 h-full grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="col-span-3 rounded overflow-hidden h-full relative">
        <div ref={container} className="h-full" />
        <div
          className={cx(
            'transition absolute w-full h-full top-0 left-0 z-10 pointer-events-none p-10',
            { 'opacity-0': !paused }
          )}
        >
          <div className="w-full text-center">Paused</div>
          <div className="w-full text-center text-black">Paused</div>
        </div>
      </div>
      <div className="p-2">
        <div className="text-lg border-b border-b-neutral-400">Shaders</div>
        <div className="my-2">
          {shaders.length === 0 && (
            <div className="text-neutral-400">No shaders found</div>
          )}
          {shaders.map((shader, index) => (
            <button
              key={shader.id}
              className={cx('shader-row', { active: shaderIndex === index })}
              onClick={() => handleRowClick(index)}
            >
              {shader.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
