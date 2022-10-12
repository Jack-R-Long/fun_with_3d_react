/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: BatatinhaRussa2021 (https://sketchfab.com/BatatinhaRussa2021)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/white-and-black-voxel-cat-d25ff8a86e7b497cbc38bc945bdd693b
title: White and Black Voxel Cat
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Cat(props) {
  const { nodes, materials } = useGLTF("/voxel_github_cat.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.palette}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/voxel_github_cat.glb");
