import "./Three.scss"
import * as React from 'react'
import * as THREE from 'three'
import { useEffect, useRef, useState } from "react"
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const Three = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!(canvasRef && canvasRef.current)) {
      return
    }
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.z = 3
    scene.add(camera)

    // Test
    const cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshNormalMaterial())
    scene.add(cube)

    const renderer = new THREE.WebGL1Renderer({
      canvas: canvasRef.current
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    const animate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()
    window.addEventListener("resize",() => {
      // Save sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
    })
  }, [canvasRef])


  return (
    <div className="three">
     <canvas ref={canvasRef} />
    </div>
  )
}

export default Three