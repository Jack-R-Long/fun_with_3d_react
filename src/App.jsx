import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, usePlane, useBox, Debug } from "@react-three/cannon";
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Html,
} from "@react-three/drei";

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

function Dodecahedron({ time, ...props }) {
  return (
    <mesh {...props}>
      <dodecahedronGeometry />
      <meshStandardMaterial roughness={0.75} emissive="#404057" />
      <Html distanceFactor={10}>
        <div className="content">
          hello <br />
          world
        </div>
      </Html>
    </mesh>
  );
}

function TwitterLogo({ time, ...props }) {
    const { scene } = useGLTF("/twitter_logo.glb");
      // const ref = useRef();
      // useFrame(
      //   () =>
      //     (ref.current.rotation.x =
      //       ref.current.rotation.y =
      //       ref.current.rotation.z +=
      //         0.02)
      // );
      return (
        <mesh {...props}>
          <primitive object={scene} />;
          <Html distanceFactor={10} position={[2, 0, 0]}>
            <div className="content">
              @JackAttack
            </div>
          </Html>
        </mesh>
      );
}


function Squad() {
  const ref = useRef();
  useFrame(
    () =>
      (ref.current.rotation.x =
        ref.current.rotation.y =
        ref.current.rotation.z +=
          0.01)
  );
  return (
    <group ref={ref}>
      <Dodecahedron position={[-2, 0, 0]} />
      <Dodecahedron position={[0, -2, -3]} />
      <TwitterLogo position={[2, 0, 0]} />
    </group>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 7.5] }}>
      <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
      <spotLight position={[50, 50, 10]} />
      <Squad />
      {/* <JackAttack scale={2} /> */}
      {/* <Space scale={.0015}/> */}
      {/* <OrbitControls
        autoRotate
        maxPolarAngle={Math.PI / 3}
        minPolarAngle={Math.PI / 3}
      /> */}
    </Canvas>
  );
}
