import { Canvas } from '@react-three/fiber';
import UserInterface from './UserInterface/index';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/Ground/Ground';
import Player from './components/Player/Player';

function App() {
  return (
    <>
      <UserInterface />
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <Physics>
          <Ground />
          <Player disabled spawn={[0, 1, -8]} />
          <Player spawn={[0, 1, 0]} />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
