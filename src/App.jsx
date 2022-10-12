import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Html, useTexture } from "@react-three/drei";
import { Bird, Cat, Lion, Plane } from "./models";

function TwitterBird({ time, ...props }) {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.02));
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() =>
        window.open("https://twitter.com/jack_attacking", "_blank")
      }
    >
      <Bird scale={0.05} />;
      <Html distanceFactor={15}>
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
  const ref = useRef();
  useFrame(() => (ref.current.rotation.y += 0.02));
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => window.open("https://github.com/Jack-R-Long", "_blank")}
    >
      <Cat scale={0.3} />
      <Html distanceFactor={20}>
        <div className="content">
          <a href="https://github.com/Jack-R-Long" target="_black">
            Github
          </a>
        </div>
      </Html>
    </mesh>
  );
}

function PanthaLion({ time, ...props }) {
  const ref = useRef();
  // useFrame(() => (ref.current.rotation.y += 0.02));
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => window.open("https://www.hellopantha.com/", "_blank")}
    >
      <Lion scale={1.3}/>
      <Html distanceFactor={20}>
        <div className="content">
          <a href="https://www.hellopantha.com/" target="_black">
            Pantha NFT
          </a>
        </div>
      </Html>
    </mesh>
  );
}

function AirForcePlane({ time, ...props }) {
  const ref = useRef();
  // useFrame(() => (ref.current.rotation.y += 0.02));
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() => window.open("https://www.linkedin.com/in/jack-long-953201157/", "_blank")}
    >
      <Plane scale={0.5} />
      <Html distanceFactor={20}>
        <div className="content">
          <a href="https://www.linkedin.com/in/jack-long-953201157/" target="_black">
            LinkedIn
          </a>
        </div>
      </Html>
    </mesh>
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

function GroupOrbit() {
  const orbitRef = useRef();
  useFrame(
    () => (orbitRef.current.rotation.x = orbitRef.current.rotation.y += 0.01)
  );
  return (
    <group>
      <M1 />
      <group ref={orbitRef}>
        <GithubCat position={[0, -9, 0]} />
        <AirForcePlane position={[0, 0, 9]} />
        <PanthaLion position={[0, 0, -9]} />
        <TwitterBird position={[0, 9, 0]} />
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
        <GroupOrbit />
      </Suspense>
    </Canvas>
  );
}
