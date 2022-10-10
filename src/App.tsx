import { Canvas } from '@react-three/fiber';
import UserInterface from './UserInterface/index';
import { Sky } from '@react-three/drei';

function App() {
  return (
    <>
      <UserInterface />
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
      </Canvas>
    </>
  );
}

export default App;
