import { Canvas } from '@react-three/fiber'
import { Environment, Float, OrbitControls } from '@react-three/drei'

function ComputerStack() {
  return (
    <group>
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.8, 1, 0.08]} />
        <meshStandardMaterial color="#0e5a8a" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.45, 0.15]} castShadow>
        <boxGeometry args={[2, 0.15, 0.8]} />
        <meshStandardMaterial color="#f27b21" />
      </mesh>
      <mesh position={[0.9, -0.5, 0.35]} castShadow>
        <capsuleGeometry args={[0.12, 0.4, 8, 16]} />
        <meshStandardMaterial color="#08324c" />
      </mesh>
      <mesh position={[-1.1, -0.25, 0.2]} castShadow>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#2a9d8f" />
      </mesh>
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="hero-scene">
      <Canvas camera={{ position: [2.5, 1.2, 2.7], fov: 45 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight castShadow position={[2, 4, 2]} intensity={1.2} />
        <Float speed={2} floatIntensity={0.8} rotationIntensity={0.4}>
          <ComputerStack />
        </Float>
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  )
}
