import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, MeshDistortMaterial, Sphere, Torus, Box, Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function Particles() {
  const points = useRef()
  const count = 200
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 10
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <Points ref={points} positions={positions} stride={3}>
      <PointMaterial size={0.03} color="#11a9e2" sizeAttenuation transparent opacity={0.8} />
    </Points>
  )
}

function TechScene() {
  const torusRef = useRef()
  const sphereRef = useRef()

  useFrame((state) => {
    if (torusRef.current) {
      torusRef.current.rotation.x = state.clock.elapsedTime * 0.3
      torusRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <group>
      {/* Central glowing sphere */}
      <Sphere ref={sphereRef} args={[0.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#1b238f"
          emissive="#11a9e2"
          emissiveIntensity={0.3}
          distort={0.4}
          speed={2}
          metalness={0.8}
          roughness={0.2}
        />
      </Sphere>

      {/* Rotating golden torus */}
      <mesh ref={torusRef} position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#f4b400"
          emissive="#f4b400"
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Floating cubes */}
      <Float speed={2} floatIntensity={0.5}>
        <Box args={[0.25, 0.25, 0.25]} position={[2, 0.5, 0]}>
          <meshStandardMaterial color="#04703e" emissive="#04703e" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
        </Box>
      </Float>
      <Float speed={1.5} floatIntensity={0.8}>
        <Box args={[0.2, 0.2, 0.2]} position={[-2, -0.5, 0.5]}>
          <meshStandardMaterial color="#ea0f8f" emissive="#ea0f8f" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
        </Box>
      </Float>
      <Float speed={3} floatIntensity={0.6}>
        <Box args={[0.15, 0.15, 0.15]} position={[1.5, -1, 0]}>
          <meshStandardMaterial color="#11a9e2" emissive="#11a9e2" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
        </Box>
      </Float>
      <Float speed={2.5} floatIntensity={0.4}>
        <Box args={[0.18, 0.18, 0.18]} position={[-1.5, 1, -0.5]}>
          <meshStandardMaterial color="#f4b400" emissive="#f4b400" emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
        </Box>
      </Float>
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="hero-scene">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        <color attach="background" args={['#050d1a']} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#11a9e2" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#f4b400" />
        <pointLight position={[0, 5, 0]} intensity={0.8} color="#ea0f8f" />
        <Particles />
        <TechScene />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} enablePan={false} />
      </Canvas>
    </div>
  )
}
