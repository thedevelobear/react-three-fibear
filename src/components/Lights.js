import React from "react";

const Lights = () => {
  return (
    <group>
      <ambientLight />
      <pointLight />
      <spotLight
        castShadow
        intensity={5}
        angle={Math.PI / 16}
        position={[10, 10, 10]}
        shadow-mapSize-width={4056}
        shadow-mapSize-height={4056}
      />
    </group>
  );
};

export { Lights };
