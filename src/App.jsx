import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Environment, Cloud, OrbitControls } from "@react-three/drei";
import { Bird, Cat, Plane, Unicorn, JackAttack } from "./models";
import { Computer } from "./computer/Computer.jsx";

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

function BuildSpaceUnicorn({ time, ...props }) {
  const ref = useRef();
  // useFrame(() => (ref.current.rotation.y = ref.current.rotation.x += 0.02));
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() =>
        window.open("https://buildspace.so/@jack_attack", "_blank")
      }
    >
      <Unicorn scale={0.5} />
      <Html distanceFactor={20}>
        <div className="content content-shift-up-100">
          <a href="https://buildspace.so/@jack_attack" target="_black">
            Web3 BuildSpace
          </a>
        </div>
      </Html>
    </mesh>
  );
}

function AirForcePlane({ time, ...props }) {
  const ref = useRef();
  return (
    <mesh
      {...props}
      ref={ref}
      onClick={() =>
        window.open(
          "https://www.linkedin.com/in/jack-long-953201157/",
          "_blank"
        )
      }
    >
      <Plane scale={0.5} />
      <Html distanceFactor={20}>
        <div className="content content-shift-up-60">
          <a
            href="https://www.linkedin.com/in/jack-long-953201157/"
            target="_black"
          >
            LinkedIn
          </a>
        </div>
      </Html>
    </mesh>
  );
}

function GroupOrbit() {
  const orbitRef = useRef();
  const vertOrbit = useRef();
  useFrame(() => {
    orbitRef.current.rotation.x = orbitRef.current.rotation.y += 0.01;
    vertOrbit.current.rotation.y -= 0.01;
  });
  return (
    <group>
      <Computer />
      <group ref={vertOrbit}>
        <AirForcePlane
          position={[0, 0, 9]}
          rotation={[-Math.PI / 2, Math.PI / 2, Math.PI / 2]}
        />
        <BuildSpaceUnicorn
          position={[0, 0, -9]}
          rotation={[-Math.PI, 0, Math.PI]}
        />
      </group>
      <group ref={orbitRef}>
        <GithubCat position={[0, -9, 0]} rotation={[0, 0, Math.PI]} />
        <TwitterBird position={[0, 9, 0]} />
      </group>
    </group>
  );
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Canvas camera={{ position: [0, 0, 15] }}>
        <hemisphereLight intensity={0.45} />
        <spotLight
          angle={0.4}
          penumbra={1}
          position={[20, 30, 2.5]}
          castShadow
          shadow-bias={-0.00001}
        />
        <directionalLight
          color="red"
          position={[-10, -10, 0]}
          intensity={1.5}
        />
        <Cloud scale={1.5} position={[20, 0, 0]} />
        <Cloud scale={1} position={[-20, 10, 0]} />
        <Environment preset="city" />
        {/* <Sky /> */}
        <spotLight position={[50, 50, 10]} />
        <GroupOrbit />
        <JackAttack position={[-2.5, 8, 0]} color="red" />
        <OrbitControls
          enablePan={false}
          // enableZoom={false}
          minPolarAngle={Math.PI / 2.2}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </Suspense>
  );
}
