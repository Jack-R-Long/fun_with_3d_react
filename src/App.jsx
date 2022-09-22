import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import {EffectComposer, DepthOfField} from '@react-three/postprocessing'

function Box({ z }) {
  const ref = useRef();

  const { nodes, materials } = useGLTF("/red_cup-transformed.glb");

  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
    rX: Math.random() * Math.PI,
    rY: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  // subscribe a component to the render-loop
  useFrame((state) => {
    ref.current.rotation.set(data.rX += 0.001, data.rY += 0.004, data.rZ += 0.005);
    ref.current.position.set(width * data.x, (data.y += 0.01), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      geometry={nodes.RedCup_RedCup_0.geometry}
      material={materials.RedCup}
    />
  );
}

export default function App({ count = 50 }) {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        {Array.from({ length: count }, (_, i) => (
          <Box key={i} z={-i} />
        ))}
        <EffectComposer>
          <DepthOfField target={[0, 0, 30]} focalLength={0.05} bokehScale={11} height={700} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
