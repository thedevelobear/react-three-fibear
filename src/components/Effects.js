import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { AdditiveBlendingShader, VolumetricLightShader } from "../shaders";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { a, useSpring } from "react-spring/three";
import { useHover } from "react-use-gesture";

const DEFAULT_LAYER = 0;
const OCCLUSION_LAYER = 1;

const Effects = () => {
  const { gl, scene, camera, size } = useThree();
  const occlusionRenderTarget = useMemo(
    () => new THREE.WebGLRenderTarget(),
    []
  );
  const occlusionComposer = useRef();
  const composer = useRef();
  const light = useRef();

  useEffect(() => {
    occlusionComposer.current.setSize(size.width, size.height);
    composer.current.setSize(size.width, size.height);
  }, [size]);

  useFrame(() => {
    camera.layers.set(OCCLUSION_LAYER);
    occlusionComposer.current.render();
    camera.layers.set(DEFAULT_LAYER);
    composer.current.render();
  }, 1);

  const [spring, setSpring] = useSpring(() => ({
    scale: [1, 1, 1],
    config: { mass: 3, friction: 40, tension: 800 }
  }));

  const bindHover = useHover(
    ({ hovering }) =>
      setSpring({ scale: hovering ? [1.25, 1.25, 1.25] : [1, 1, 1] }),
    {
      pointerEvents: true
    }
  );

  return (
    <>
      <a.mesh ref={light} layers={OCCLUSION_LAYER} {...spring} {...bindHover()}>
        <circleGeometry attach="geometry" args={[0.8, 50]} />
        <meshBasicMaterial attach="material" color="#ffddaa" />
      </a.mesh>
      <effectComposer
        ref={occlusionComposer}
        args={[gl, occlusionRenderTarget]}
        renderToScreen={false}
      >
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass
          attachArray="passes"
          args={[VolumetricLightShader]}
          needsSwap={false}
        />
      </effectComposer>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" args={[scene, camera]} />
        <shaderPass
          attachArray="passes"
          args={[AdditiveBlendingShader]}
          material-uniforms-tAdd-value={occlusionRenderTarget.texture}
        />
        <shaderPass
          attachArray="passes"
          args={[FXAAShader]}
          material-uniforms-resolution-value={[1 / size.width, 1 / size.height]}
          renderToScreen
        />
        <unrealBloomPass attachArray="passes" args={[undefined, 0.2, 0.2, 0]} />
        <filmPass attachArray="passes" args={[0.7, 0.5, 1000, false]} />
      </effectComposer>
    </>
  );
};

export { Effects };
