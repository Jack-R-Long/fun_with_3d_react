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

function JackAttack(props) {
  const { scene } = useGLTF("/jackattacktext.glb");
  return <primitive object={scene} {...props} />;
}

function Space(props) {
  const { scene } = useGLTF("/low_poly_ufo_scene.glb");
  return <primitive object={scene} {...props} />;
}

export default function App() {
  return (
    <Canvas camera={{ fov: 50 }}>
      <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
      <spotLight position={[50, 50, 10]} />
      <group position={[0, 0, 0]}>
        {/* <JackAttack scale={2} /> */}
        <Space scale={.0015}/>
        <ContactShadows scale={20} blur={10} far={20} />
      </group>
      <OrbitControls
        autoRotate
        maxPolarAngle={Math.PI / 3}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}
