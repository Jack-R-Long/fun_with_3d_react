import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, usePlane, useBox, Debug } from "@react-three/cannon";
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Html,
  useTexture,
} from "@react-three/drei";
import { MeshLambertMaterial } from "three";

function TwitterBird({ time, ...props }) {
  const { scene } = useGLTF("/voxel_twitter_bird.glb");
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.02));
  return (
    <mesh {...props} onClick={(e) => alert("HI")} ref={ref}>
      <primitive object={scene} scale={0.05} />;
      <Html distanceFactor={20}>
        <div className="content">
          <a href="https://twitter.com/jack_attacking" target="_black">
            @JackAttack
          </a>
        </div>
      </Html>
    </mesh>
  );
}

function GithubCat({ time, ...props }) {
  const { scene } = useGLTF("/voxel_github_cat.glb");
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y = ref.current.rotation.z += 0.02));
  return (
    <mesh {...props} onClick={(e) => alert("HI")} ref={ref}>
      <primitive object={scene} scale={0.3} />;
      <Html distanceFactor={20}>
        <div className="content">
          <a href="https://twitter.com/jack_attacking" target="_black">
            Github
          </a>
        </div>
      </Html>
    </mesh>
  );
}

function LinkedIn({ time, ...props }) {
  const { scene } = useGLTF("/linkedin_logo.glb");
  const ref = useRef();
  ref.onClick = (e) => {
    alert("hi");
  };
  const [hover, setHover] = useState(false);
  useFrame(() => (ref.current.rotation.y += 0.02));
  return (
    <group {...props} ref={ref} onClick={(e) => alert("Hi")}>
      <primitive
        object={scene}
        scale={0.75}

        // onPointerOver={() => setHover(true)}
        // onPointerOut={() => setHover(false)}
      />
      ;
      <Html distanceFactor={20} onClick={(e) => console.log("click")}>
        <div className="content">
          <a href="https://twitter.com/jack_attacking" target="_black">
            LinkedIn
          </a>
        </div>
      </Html>
    </group>
  );
}

function M1({ ...props }) {
  const texture = useTexture("/Chroma Blue.jpg");
  const { nodes, materials } = useGLTF("/computer.glb");
  return (
    <group
      {...props}
      dispose={null}
      rotation-x={0.425}
      scale={0.2}
      onClick={(e) => alert("HI")}
    >
      <group position={[0, -0.43, -11.35]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.back_1.geometry}
          material={materials.blackmatte}
        />
        <mesh
          receiveShadow
          castShadow
          geometry={nodes.back_2.geometry}
          material={materials.aluminium}
        />
        <mesh geometry={nodes.matte.geometry}>
          <meshLambertMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
      {/* {children} */}
      <mesh
        geometry={nodes.body_1.geometry}
        material={materials.aluminium}
        material-color="#aaaaaf"
        material-envMapIntensity={0.2}
      />
      <mesh geometry={nodes.body_2.geometry} material={materials.blackmatte} />
    </group>
  );
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

function TwitterDodecha({ time, ...props }) {
  const texture = useTexture("/Chroma Blue.jpg");

  return (
    <mesh {...props}>
      <dodecahedronGeometry />
      <meshStandardMaterial map={texture} toneMapped={false} />
      <Html distanceFactor={10}>
        <div className="content">
          hello <br />
          world
        </div>
      </Html>
    </mesh>
  );
}

function Squad() {
  const orbitRef = useRef();
  useFrame(
    () => (orbitRef.current.rotation.x = orbitRef.current.rotation.y += 0.01)
  );
  return (
    <group>
      <M1 />
      <group ref={orbitRef}>
        <GithubCat position={[0, -7, 0]}/>
        <Dodecahedron position={[0, 0, 7]} />
        <Dodecahedron position={[0, 0, -7]} />
        <TwitterBird position={[0, 7, 0]} />
      </group>
    </group>
  );
}

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 15] }}>
      <Suspense fallback={null}>
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
      </Suspense>
    </Canvas>
  );
}
