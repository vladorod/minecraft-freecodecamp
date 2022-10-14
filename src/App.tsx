import { Canvas } from '@react-three/fiber';
import UserInterface from './UserInterface/index';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/Ground/Ground';

function App() {
  return (
    <>
      <UserInterface />
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <ambientLight intensity={0.5} />
        <Physics>
          <Ground />
        </Physics>
      </Canvas>
    </>
  );
}

export default App;
