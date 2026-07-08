import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

// Define the winding path for the camera to fly through
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(-8, 3, -10),
  new THREE.Vector3(0, 0, -30),
  new THREE.Vector3(8, -4, -50),
  new THREE.Vector3(0, 0, -70),
  new THREE.Vector3(-8, 4, -90),
  new THREE.Vector3(0, 0, -110),
]);

function CameraRig() {
  const { camera } = useThree();
  const lookAtRef = useRef(new THREE.Vector3());
  const currentPosRef = useRef(new THREE.Vector3(0, 0, 10));

  useFrame((state) => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Get exact point and tangent on the curve based on scroll
    const point = curve.getPointAt(scrollProgress);
    const tangent = curve.getTangentAt(scrollProgress).normalize();
    const targetLookAt = point.clone().add(tangent.multiplyScalar(5));

    // Smoothly interpolate the base camera position
    currentPosRef.current.lerp(point, 0.05);

    // Apply micro-parallax based on mouse position
    const mouseX = state.mouse.x * 2;
    const mouseY = state.mouse.y * 2;

    const finalPos = currentPosRef.current.clone();
    finalPos.x += mouseX;
    finalPos.y += mouseY;

    camera.position.lerp(finalPos, 0.1);

    // Smoothly interpolate where the camera is looking
    lookAtRef.current.lerp(targetLookAt, 0.05);
    camera.lookAt(lookAtRef.current);
    
    // Add dynamic roll (banking into turns like a plane)
    const roll = -state.mouse.x * 0.1 + (tangent.x * 0.2);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, roll, 0.05);
  });
  return null;
}

function CyberTunnel({ theme }) {
  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 100, 15, 8, false), []);
  const isLight = theme === 'girly';
  
  return (
    <mesh geometry={tubeGeometry}>
      <meshBasicMaterial 
        color={isLight ? "#ff007f" : "#00f0ff"} 
        wireframe 
        transparent 
        opacity={isLight ? 0.2 : 0.05} 
        side={THREE.BackSide} 
      />
    </mesh>
  );
}

function InstancedDebris({ theme }) {
  const meshRef = useRef();
  const count = 3000;
  const isLight = theme === 'girly';
  
  // Pre-calculate random positions and rotations along the tube
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      // Pick a random progress point along the curve
      const t = Math.random();
      const pos = curve.getPointAt(t);
      // Offset randomly from the center path
      const offset = new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 10
      );
      pos.add(offset);
      
      const rot = new THREE.Vector3(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      const scale = Math.random() * 0.5 + 0.1;
      const speed = Math.random() * 0.02;
      // 0 for color1, 1 for color2
      const type = Math.random() > 0.8 ? 1 : 0; 

      arr.push({ pos, rot, scale, speed, type });
    }
    return arr;
  }, []);

  const color1 = new THREE.Color(isLight ? "#ff007f" : "#00f0ff");
  const color2 = new THREE.Color(isLight ? "#00e5ff" : "#ff003c");

  useFrame(() => {
    if (!meshRef.current) return;
    
    particles.forEach((p, i) => {
      p.rot.x += p.speed;
      p.rot.y += p.speed;
      
      dummy.position.copy(p.pos);
      dummy.rotation.set(p.rot.x, p.rot.y, p.rot.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, p.type === 0 ? color1 : color2);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial wireframe />
    </instancedMesh>
  );
}

export default function Scene({ theme }) {
  const isLight = theme === 'girly';
  const bgColor = isLight ? '#fbf9fc' : '#030303';
  const fogColor = isLight ? '#fbf9fc' : '#030303';

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: bgColor, transition: 'background 0.5s' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 10, 40]} />
        
        <CameraRig />
        <CyberTunnel theme={theme} />
        <InstancedDebris theme={theme} />

        {/* High-End Post-Processing Pipeline */}
        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom 
            luminanceThreshold={isLight ? 0.5 : 0.1} 
            luminanceSmoothing={0.9} 
            intensity={isLight ? 0.8 : 1.5} 
            kernelSize={5} 
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL} 
            offset={[0.002, 0.002]} 
          />
          <Noise 
            opacity={0.03} 
            blendFunction={BlendFunction.OVERLAY} 
          />
          <Vignette 
            eskil={false} 
            offset={0.1} 
            darkness={1.1} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
