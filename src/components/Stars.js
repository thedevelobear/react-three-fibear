import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useRender } from "react-three-fiber";

const Stars = () => {
  let group = useRef();
  let theta = 0;
  useRender(() => {
    if (group.current) {
      const r = 5 * Math.sin(THREE.Math.degToRad((theta += 0.002)));
      const s = Math.cos(THREE.Math.degToRad(theta * 2));
      group.current.rotation.set(r, r, r);
      group.current.scale.set(s, s, s);
    }
  });

  const [geo, mat, coords] = useMemo(() => {
    const geo = new THREE.SphereBufferGeometry(0.3, 10, 10);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffddaa")
    });
    const coords = new Array(1000)
      .fill()
      .map(i => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 800 - 400
      ]);
    return [geo, mat, coords];
  }, []);

  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
};
export { Stars };
