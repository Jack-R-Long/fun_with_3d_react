import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, usePlane, useBox, Debug } from "@react-three/cannon";
import { useGLTF, OrbitControls, ContactShadows } from "@react-three/drei";

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }));

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color="hotpink" />
    </mesh>
  );
}

function Scene(props) {
  const {scene} = useGLTF('/jackattacktext.glb');
  return (
    <primitive object={scene}  {...props}/>
  )
}

export default function App() {
  return (

      <Canvas camera={{ position: [-10, 10, 40], fov: 50 }}>
        <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
        <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
        <group position={[0, 0, 0]}>
          <Scene position={[-20, 0.25, 0]} scale={10}/>
          <ContactShadows scale={20} blur={10} far={20} />
        </group>
        <OrbitControls />
      </Canvas>

  );
}
