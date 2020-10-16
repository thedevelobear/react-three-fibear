import React, { useRef, useState } from "react";
import { useLoader, useRender } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";
import { useHover } from "react-use-gesture";
import { a, useSpring } from "react-spring/three";

const Bear = props => {
  const { onBellyClick } = props;
  const group = useRef();
  const gltf = useLoader(
    GLTFLoader,
    process.env.NODE_ENV === "production"
      ? "/react-three-fibear/DevelobearDraco.gltf"
      : "/DevelobearDraco.gltf",
    loader => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        process.env.NODE_ENV === "production"
          ? "/react-three-fibear/draco-gltf/"
          : "/draco-gltf/"
      );
      loader.setDRACOLoader(dracoLoader);
    }
  );
  let theta = 0;
  useRender(() => {
    if (group.current) {
      const y = Math.sin(THREE.Math.degToRad((theta += 0.7)));
      group.current.rotation.set(0, y, 0);
    }
  });
  const [spring, setSpring] = useSpring(() => ({
    scale: [0.2, 0.2, 0.2],
    config: { mass: 3, friction: 40, tension: 800 }
  }));

  const bindHover = useHover(
    ({ hovering }) =>
      setSpring({ scale: hovering ? [0.25, 0.25, 0.25] : [0.2, 0.2, 0.2] }),
    {
      pointerEvents: true
    }
  );

  return (
    <a.group
      ref={group}
      {...props}
      {...spring}
      {...bindHover()}
      onClick={onBellyClick}
    >
      <scene name="Scene">
        <object3D name="Spot" position={[0, 0, 0]} />
        <group name="Bear" position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <mesh
            name="Cilindro.001_0"
            layers={props.layer}
            castShadow
            receiveShadow
          >
            <bufferGeometry attach="geometry" {...gltf.__$[4].geometry} />
            <meshStandardMaterial
              attach="material"
              {...gltf.__$[4].material}
              name="brown"
              roughness={1}
            />
          </mesh>
          <mesh
            name="Cilindro.001_1"
            layers={props.layer}
            castShadow
            receiveShadow
          >
            <bufferGeometry attach="geometry" {...gltf.__$[5].geometry} />
            <meshStandardMaterial
              attach="material"
              {...gltf.__$[5].material}
              name="light brown"
              roughness={1}
            />
          </mesh>
          <mesh
            name="Cilindro.001_2"
            layers={props.layer}
            castShadow
            receiveShadow
          >
            <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
            <meshStandardMaterial
              attach="material"
              {...gltf.__$[6].material}
              name="almost black"
              roughness={1}
            />
          </mesh>
          <mesh
            name="Cilindro.001_3"
            layers={props.layer}
            castShadow
            receiveShadow
          >
            <bufferGeometry attach="geometry" {...gltf.__$[7].geometry} />
            <meshStandardMaterial
              attach="material"
              {...gltf.__$[7].material}
              name="almost white"
              roughness={1}
            />
          </mesh>
        </group>
      </scene>
    </a.group>
  );
};

export { Bear };
