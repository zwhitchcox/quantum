import React, { useEffect, useRef } from 'react'


const Particles = () => {
  let width, ctx, height, canvas, ball, A;
  const canvasRef:any = useRef()
  const frameRate = 1/40; // Seconds
  const frameDelay = frameRate * 1000; // ms
  let loopTimer:any = false;


  const Cd = 0.47;  // Dimensionless
  const rho = 1.22; // kg / m^3 <- density
  const ag = 9.81;  // m / s^2
  const mouse = {x: 0, y: 0, isDown: false};

  function getMousePosition(e) {
      mouse.x = e.pageX - canvas.offsetLeft;
      mouse.y = e.pageY - canvas.offsetTop;
  }
  const mouseDown = function(e) {
      if (e.which == 1) {
          getMousePosition(e);
          mouse.isDown = true;
          ball.position.x = mouse.x;
          ball.position.y = mouse.y;
      }
  }
  const mouseUp = function(e) {
      if (e.which == 1) {
          mouse.isDown = false;
          ball.velocity.y = (ball.position.y - mouse.y) /10;
          ball.velocity.x = (ball.position.x - mouse.x) / 10;
      }
  }
  var loop = function() {
      if ( ! mouse.isDown) {
          // Do physics
              // Drag force: Fd = -1/2 * Cd * A * rho * v * v
          var Fx = -0.5 * Cd * A * rho * ball.velocity.x * ball.velocity.x * ball.velocity.x / Math.abs(ball.velocity.x);
          var Fy = -0.5 * Cd * A * rho * ball.velocity.y * ball.velocity.y * ball.velocity.y / Math.abs(ball.velocity.y);

          Fx = (isNaN(Fx) ? 0 : Fx);
          Fy = (isNaN(Fy) ? 0 : Fy);

              // Calculate acceleration ( F = ma )
          var ax = Fx / ball.mass;
          var ay = ag + (Fy / ball.mass);
              // Integrate to get velocity
          ball.velocity.x += ax*frameRate;
          ball.velocity.y += ay*frameRate;

              // Integrate to get position
          ball.position.x += ball.velocity.x*frameRate*100;
          ball.position.y += ball.velocity.y*frameRate*100;
      }
      // Handle collisions
      if (ball.position.y > height - ball.radius) {
          ball.velocity.y *= ball.restitution;
          ball.position.y = height - ball.radius;
      }
      if (ball.position.x > width - ball.radius) {
          ball.velocity.x *= ball.restitution;
          ball.position.x = width - ball.radius;
      }
      if (ball.position.x < ball.radius) {
          ball.velocity.x *= ball.restitution;
          ball.position.x = ball.radius;
      }
      // Draw the ball


      ctx.clearRect(0,0,width,height);

      ctx.save();

      ctx.translate(ball.position.x, ball.position.y);
      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, 0, Math.PI*2, true);
      ctx.fill();
      ctx.closePath();

      ctx.restore();



      // Draw the slingshot
      if (mouse.isDown) {
          ctx.beginPath();
          ctx.moveTo(ball.position.x, ball.position.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          ctx.closePath();
      }

  }
  useEffect(() => {
    if (typeof canvasRef === "undefined")
      return
    canvas = canvasRef.current
    ctx = canvas.getContext("2d")
    width = canvas.clientWidth
    height = canvas.clientHeight
    ball = {
      position: {x: width/2, y: 0},
      velocity: {x: 10, y: 0},
      mass: 0.1, //kg
      radius: 15, // 1px = 1cm
      restitution: -0.7
    }
    A = Math.PI * ball.radius * ball.radius / (10000); // m^2

    canvas.onmousemove = getMousePosition;
    canvas.onmousedown = mouseDown;
    canvas.onmouseup = mouseUp;

    ctx.fillStyle = 'red';
    ctx.strokeStyle = '#000000';
    loopTimer = setInterval(loop, frameDelay);
    return () => clearInterval(loopTimer)
  }, [])
  return (
    <canvas width="944" height="300" ref={canvasRef} className="particles" />
  )
}

export default Particles