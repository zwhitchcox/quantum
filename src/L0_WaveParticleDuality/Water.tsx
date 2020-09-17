import { NORD } from '../constants'
import React, { useEffect, useRef, useState } from 'react'

const Water = () => {
  let wave, ctx, canvas;
  let prevTime = 0;

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


  const animate = (time) => {
    const deltaSeconds = (time - prevTime) / 1000
    const distancePerSecond = 400;
    const xOffset = deltaSeconds*distancePerSecond
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle= NORD.blue1
    ctx.lineWidth = 3
    const frequency = 40

    // draw wave
    ctx.beginPath()
    let x = 0;
    while (x <= canvas.clientWidth*4) {
      const y = canvas.clientHeight/2 + 80 * Math.sin((x+xOffset)/frequency);
      ctx.lineTo(x, y)
      x++
    }
    ctx.stroke()
    requestAnimationFrame(animate)
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
      amplitude: canvas.clientHeight / 4,
      speed: .01
    }
    requestAnimationFrame(animate)
  }, [canvasRef])

  return (
    <canvas width="944" height="300" ref={canvasRef} className="water" />
  )
}

export default Water