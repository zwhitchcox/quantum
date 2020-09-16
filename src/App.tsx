import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.scss';
import WaveParticleDuality from './L0_WaveParticleDuality/WaveParticleDuality';

const navLinks = [
  {
    to: "/wave-particle-duality",
    txt: 'Wave-Particle Duality'
  }
]
function App() {
  return (
    <div className="App">
      <header>
        <h1>Learn Quantum Physics</h1>
      </header>
      <div className="App-body">
        <main>
          <Switch>
            <Route path="/wave-particle-duality">
              <WaveParticleDuality />
            </Route>
            <Route path="/">
              Home
            </Route>
          </Switch>
        </main>
        <nav>
          <ul>
            {navLinks.map(({to, txt}, i) => (
              <li key={to}>
                <Link to={to}>
                  0. {txt}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <footer>footer</footer>
    </div>
  );
}

export default App;
