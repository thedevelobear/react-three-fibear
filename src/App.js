import React, { Suspense } from "react";
import { Canvas, extend } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { Bear } from "./components/Bear";
import { Lights } from "./components/Lights";
import { Effects } from "./components/Effects";
import { Loading } from "./components/Loading";
import { Controls } from "./components/Controls";
import { Logo } from "./components/Logo";
import { Stars } from "./components/Stars";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass";
import { Grayscale } from "./components/Grayscale";

extend({
  OrbitControls,
  EffectComposer,
  RenderPass,
  ShaderPass,
  UnrealBloomPass,
  FilmPass,
  SMAAPass
});

const DEFAULT_LAYER = 0;
const OCCLUSION_LAYER = 1;

const App = () => {
  return (
    <Grayscale>
      <Loading />
      <Canvas shadowMap camera={{ position: [0, 0, 4.5] }}>
        <Controls />
        <Suspense fallback={null}>
          <Logo />
        </Suspense>
        <Effects />
        <Lights />
        <Suspense fallback={null}>
          <Bear
            layer={DEFAULT_LAYER}
            position={[0, -0.45, 2]}
            scale={[0.2, 0.2, 0.2]}
          />
          <Bear
            layer={OCCLUSION_LAYER}
            position={[0, -0.45, 2]}
            scale={[0.2, 0.2, 0.2]}
          />
        </Suspense>
        <Stars />
      </Canvas>
    </Grayscale>
  );
};

export default App;
