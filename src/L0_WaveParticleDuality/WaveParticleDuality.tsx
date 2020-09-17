import React from 'react'
import Both from './Both';
import Particles from './Particles';
import Water from './Water';
import "./WaveParticleDuality.scss"

const WaveParticleDuality = () => {
  return (
    <div>
      <h2>Wave-Particle Duality</h2>
      <p>
        In order to understand wave-particle duality, we need to first understand what we mean by "waves" and "particles".
      </p>
      <Both />
      <p>
        Particles are exactly what we think of when we think of "classical" objects. They bounce of things, run into each other, and are solid, physical objects.
      </p>
      <Particles />
      <p>
        Waves are a bit more complicated. A wave is a periodic disturbance in some medium. For instance in water, waves move the water up and down. But the wave isn't the water. The wave is the disturbance of the water.
      </p>
      <Water />
    </div>
  )
}

export default WaveParticleDuality