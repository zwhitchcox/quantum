import { NORD } from '../constants'
import React, { useEffect, useRef, useState } from 'react'
import './Waves.scss'

const Waves = () => {
  let wave, ctx, theta, canvas;
  let step = 2;
  const canvasRef:any = useRef()
  const requestRef:any = useRef()
  const previousTimeRef:any = useRef()
  // const animate = time => {
  //   if (previousTimeRef.current != undefined) {
  //     const deltaTime = time - previousTimeRef.current
  //     setCount(prevCount => (prevCount + deltaTime * .01) % 100)
  //   }
  //   previousTimeRef.current = time
  //   requestRef.current = requestAnimationFrame(animate)
  // }

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle= NORD.blue1
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.stroke()
    for (let i = 0; i < canvas.clientWidth / 2; i+= step) {
        ctx.beginPath()
        const x = i
        const y = wave.y + Math.sin(i *200000) * wave.amplitude
        ctx.ellipse(x, y, 2, 2, 0, 0, 2 * Math.PI)
        ctx.stroke()
    }
    // requestAnimationFrame(animate)
  }

  // useEffect(() => {
  //   requestRef.current = requestAnimationFrame(animate)
  //   return () => cancelAnimationFrame(requestRef.current)
  //   // if (typeof canvasRef === "undefined" )
  //   //   return
  // }, [])
  useEffect(() => {
    if (typeof canvasRef === "undefined")
      return
    canvas = canvasRef.current
    ctx = canvas.getContext("2d")
    wave = {
      y: canvas.clientHeight / 2,
      length: 200000,
      amplitude: canvas.clientHeight / 6,
      speed: .01
    }
    theta = 0;
    requestAnimationFrame(animate)
  }, [canvasRef])

  return (
    <canvas width="944" height="300" ref={canvasRef} className="waves" />
  )
}

export default Waves