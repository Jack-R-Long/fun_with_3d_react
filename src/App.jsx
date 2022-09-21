import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


function Box({ z }) {
  const ref = useRef();
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z]);

  const [data] = useState({
    x: THREE.MathUtils.randFloatSpread(2),
    y: THREE.MathUtils.randFloatSpread(height),
  });

  // subscribe a component to the render-loop
  useFrame((state) => {
    ref.current.position.set(width * data.x, (data.y += 0.5), z);
    if (data.y > height / 1.5) {
      data.y = -height / 1.5;
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color="orange" />
    </mesh>
  );
}

function Apple(props) {
  const { scene } = useLoader(GLTFLoader, "/red_cup.glb");
  return <primitive object={scene} {...props} />;
}

export default function App({ count = 50 }) {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Apple scale={10}/>
      </Suspense>
      {/* {Array.from({ length: count }, (_, i) => (<Box key={i} z={-i} />))} */}
    </Canvas>
  );
}
