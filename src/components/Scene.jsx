import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 10),
  new THREE.Vector3(-8, 3, -10),
  new THREE.Vector3(0, 0, -30),
  new THREE.Vector3(8, -4, -50),
  new THREE.Vector3(0, 0, -70),
  new THREE.Vector3(-8, 4, -90),
  new THREE.Vector3(0, 0, -110),
]);

const _lookTarget = new THREE.Vector3();
const _finalPos = new THREE.Vector3();

function usePerfProfile() {
  const [profile, setProfile] = useState(() => getPerfProfile());

  useEffect(() => {
    const onResize = () => setProfile(getPerfProfile());
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => setProfile(getPerfProfile());
    window.addEventListener('resize', onResize);
    mq.addEventListener?.('change', onMotion);
    return () => {
      window.removeEventListener('resize', onResize);
      mq.removeEventListener?.('change', onMotion);
    };
  }, []);

  return profile;
}

function getPerfProfile() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
  if (reducedMotion) {
    return { particleCount: 0, effects: false, dpr: [1, 1], multisampling: 0, reducedMotion: true };
  }
  if (mobile) {
    return { particleCount: 900, effects: false, dpr: [1, 1.25], multisampling: 0, reducedMotion: false };
  }
  return { particleCount: 1800, effects: true, dpr: [1, 1.5], multisampling: 2, reducedMotion: false };
}

function CameraRig({ reducedMotion }) {
  const { camera } = useThree();
  const lookAtRef = useRef(new THREE.Vector3());
  const currentPosRef = useRef(new THREE.Vector3(0, 0, 10));

  useFrame((state) => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = Math.min(1, Math.max(0, maxScroll > 0 ? scrollY / maxScroll : 0));

    const point = curve.getPointAt(scrollProgress);
    const tangent = curve.getTangentAt(scrollProgress).normalize();
    _lookTarget.copy(point).addScaledVector(tangent, 5);

    currentPosRef.current.lerp(point, reducedMotion ? 1 : 0.05);

    const mouseX = reducedMotion ? 0 : state.mouse.x * 2;
    const mouseY = reducedMotion ? 0 : state.mouse.y * 2;

    _finalPos.copy(currentPosRef.current);
    _finalPos.x += mouseX;
    _finalPos.y += mouseY;

    camera.position.lerp(_finalPos, reducedMotion ? 1 : 0.1);
    lookAtRef.current.lerp(_lookTarget, reducedMotion ? 1 : 0.05);
    camera.lookAt(lookAtRef.current);

    if (!reducedMotion) {
      const roll = -state.mouse.x * 0.1 + tangent.x * 0.2;
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, roll, 0.05);
    } else {
      camera.rotation.z = 0;
    }
  });
  return null;
}

function CyberTunnel({ theme }) {
  const tubeGeometry = useMemo(() => new THREE.TubeGeometry(curve, 64, 15, 6, false), []);
  const isLight = theme === 'girly';

  return (
    <mesh geometry={tubeGeometry}>
      <meshBasicMaterial
        color={isLight ? '#ff007f' : '#00f0ff'}
        wireframe
        transparent
        opacity={isLight ? 0.2 : 0.05}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function InstancedDebris({ theme, count }) {
  const meshRef = useRef();
  const isLight = theme === 'girly';

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random();
      const pos = curve.getPointAt(t);
      pos.add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 10
        )
      );
      arr.push({
        pos,
        rot: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02,
        type: Math.random() > 0.8 ? 1 : 0,
      });
    }
    return arr;
  }, [count]);

  const color1 = useMemo(() => new THREE.Color(isLight ? '#ff007f' : '#00f0ff'), [isLight]);
  const color2 = useMemo(() => new THREE.Color(isLight ? '#00e5ff' : '#ff003c'), [isLight]);

  useFrame(() => {
    if (!meshRef.current || count === 0) return;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.rot.x += p.speed;
      p.rot.y += p.speed;
      dummy.position.copy(p.pos);
      dummy.rotation.set(p.rot.x, p.rot.y, p.rot.z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, p.type === 0 ? color1 : color2);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  if (count === 0) return null;

  return (
    <instancedMesh key={count} ref={meshRef} args={[null, null, count]}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial wireframe />
    </instancedMesh>
  );
}

function SceneEffects({ theme, enabled, multisampling }) {
  const isLight = theme === 'girly';
  if (!enabled) return null;

  return (
    <EffectComposer disableNormalPass multisampling={multisampling}>
      <Bloom
        luminanceThreshold={isLight ? 0.5 : 0.1}
        luminanceSmoothing={0.9}
        intensity={isLight ? 0.8 : 1.2}
        kernelSize={3}
      />
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0015, 0.0015]} />
      <Noise opacity={0.025} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.1} darkness={1.05} />
    </EffectComposer>
  );
}

export default function Scene({ theme }) {
  const isLight = theme === 'girly';
  const bgColor = isLight ? '#fbf9fc' : '#030303';
  const fogColor = isLight ? '#fbf9fc' : '#030303';
  const profile = usePerfProfile();
  const [visible, setVisible] = useState(!document.hidden);

  useEffect(() => {
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: bgColor,
        transition: 'background 0.5s',
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        frameloop={visible ? 'always' : 'never'}
        dpr={profile.dpr}
        gl={{ antialias: !profile.effects, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 10, 40]} />

        <CameraRig reducedMotion={profile.reducedMotion} />
        <CyberTunnel theme={theme} />
        <InstancedDebris theme={theme} count={profile.particleCount} />
        <SceneEffects theme={theme} enabled={profile.effects} multisampling={profile.multisampling} />
      </Canvas>
    </div>
  );
}
