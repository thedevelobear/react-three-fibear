import React, { useRef } from "react";
import { useRender, useThree } from "react-three-fiber";

const Controls = () => {
  const { camera } = useThree();
  const ref = useRef();
  useRender(() => ref.current.update());
  return (
    <orbitControls
      args={[camera]}
      ref={ref}
      enableZoom={false}
      enableKeys={false}
      minPolarAngle={Math.PI / 2.5}
      maxPolarAngle={Math.PI / 1.7}
      minAzimuthAngle={-Math.PI / 16}
      maxAzimuthAngle={Math.PI / 16}
      enableDamping
      dampingFactor={0.07}
    />
  );
};

export { Controls };
