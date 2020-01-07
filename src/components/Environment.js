import React from "react";
import { BackSide } from "three";

const Environment = () => {
  return (
    <mesh>
      <sphereBufferGeometry args={[5, 10, 10]} attach="geometry" />
      <meshStandardMaterial color={0x000} attach="material" side={BackSide} />
    </mesh>
  );
};

export { Environment };
