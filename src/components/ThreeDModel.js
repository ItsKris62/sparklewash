// ThreeDModel.js
import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { animated, useSpring } from '@react-spring/three';

export default function ThreeDModel({ isHovered }) {
  const modelRef = useRef();
  
  // Simple animation for scaling on hover
  const { scale } = useSpring({
    scale: isHovered ? 1.1 : 1,
    config: { mass: 1, tension: 300, friction: 20 },
  });

  const { scene } = useGLTF('/');

  return (
    <animated.mesh ref={modelRef} scale={scale}>
      <primitive object={scene} />
    </animated.mesh>
  );
}
