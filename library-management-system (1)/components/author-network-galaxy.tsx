"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Html, Environment } from "@react-three/drei"
import { Vector3 } from "three"

// Node component representing an author
function AuthorNode({ position, name, connections, size = 1, color = "#1e88e5" }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={active ? size * 1.5 : hovered ? size * 1.2 : size}
        onClick={() => setActive(!active)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>

      {(hovered || active) && (
        <Html distanceFactor={10}>
          <div className="bg-background/90 backdrop-blur-sm p-2 rounded-md shadow-lg border border-border">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{connections} connections</p>
          </div>
        </Html>
      )}

      <Text position={[0, -1.5, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        {name}
      </Text>
    </group>
  )
}

// Connection line between authors
function Connection({ start, end, thickness = 0.05, color = "#64b5f6" }) {
  const startVec = new Vector3(...start)
  const endVec = new Vector3(...end)
  const direction = endVec.clone().sub(startVec)
  const length = direction.length()
  const position = startVec.clone().add(direction.multiplyScalar(0.5))
  const lookAt = endVec.clone()

  return (
    <mesh position={position} lookAt={lookAt}>
      <cylinderGeometry args={[thickness, thickness, length, 8]} rotation={[Math.PI / 2, 0, 0]} />
      <meshStandardMaterial color={color} transparent opacity={0.6} />
    </mesh>
  )
}

// Main component
export default function AuthorNetworkGalaxy() {
  // Sample data for authors and connections
  const authors = [
    { id: 1, name: "Balagurusamy E", position: [0, 0, 0], connections: 12, size: 1.5, color: "#1e88e5" },
    { id: 2, name: "Grewal B S", position: [-5, 3, -2], connections: 8, size: 1.2, color: "#42a5f5" },
    { id: 3, name: "Forouzan", position: [6, -2, 4], connections: 10, size: 1.3, color: "#64b5f6" },
    { id: 4, name: "Russell Stuart", position: [-3, -4, 5], connections: 7, size: 1.1, color: "#90caf9" },
    { id: 5, name: "Mitchell, Tom M.", position: [4, 5, -3], connections: 9, size: 1.2, color: "#bbdefb" },
    { id: 6, name: "Thareja Reema", position: [-7, -1, -5], connections: 6, size: 1.0, color: "#2196f3" },
    { id: 7, name: "Kothari, D P", position: [2, -6, -4], connections: 5, size: 0.9, color: "#1976d2" },
    { id: 8, name: "Haykin, Simon", position: [-4, 2, 6], connections: 11, size: 1.4, color: "#0d47a1" },
    { id: 9, name: "Das J B K", position: [3, 4, 2], connections: 8, size: 1.2, color: "#1565c0" },
    { id: 10, name: "Annaiah M H", position: [-2, -3, -6], connections: 7, size: 1.1, color: "#0288d1" },
    { id: 11, name: "Rao M N", position: [5, -5, 3], connections: 6, size: 1.0, color: "#0097a7" },
    { id: 12, name: "Jogdand", position: [-6, 2, -4], connections: 5, size: 0.9, color: "#00796b" },
    { id: 13, name: "Jai Prakash, B S", position: [7, 0, -2], connections: 7, size: 1.1, color: "#388e3c" },
    { id: 14, name: "Hopcroft, John E", position: [-1, 6, 4], connections: 9, size: 1.3, color: "#689f38" },
    { id: 15, name: "Kurose, James F", position: [1, -7, 5], connections: 8, size: 1.2, color: "#afb42b" },
  ]

  // Define connections between authors based on department/subject relationships
  const connections = [
    { from: 1, to: 6 }, // Programming authors
    { from: 1, to: 14 },
    { from: 2, to: 5 }, // Mathematics authors
    { from: 3, to: 15 }, // Networking authors
    { from: 3, to: 8 },
    { from: 4, to: 5 }, // AI/ML authors
    { from: 5, to: 14 },
    { from: 6, to: 1 },
    { from: 7, to: 8 }, // Electronics authors
    { from: 9, to: 10 }, // Mechanical authors
    { from: 11, to: 13 }, // Chemistry/Environmental authors
    { from: 12, to: 11 },
    { from: 13, to: 11 },
    { from: 14, to: 15 }, // Computer Science authors
    { from: 15, to: 3 },
  ]

  return (
    <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />

      {/* Render author nodes */}
      {authors.map((author) => (
        <AuthorNode
          key={author.id}
          position={author.position}
          name={author.name}
          connections={author.connections}
          size={author.size}
          color={author.color}
        />
      ))}

      {/* Render connections between authors */}
      {connections.map((connection, index) => {
        const fromAuthor = authors.find((a) => a.id === connection.from)
        const toAuthor = authors.find((a) => a.id === connection.to)

        if (fromAuthor && toAuthor) {
          return <Connection key={index} start={fromAuthor.position} end={toAuthor.position} />
        }
        return null
      })}

      <OrbitControls enableZoom={true} enablePan={true} />
    </Canvas>
  )
}

