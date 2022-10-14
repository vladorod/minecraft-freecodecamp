import { Triplet, useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Vector3 } from 'three';

const Player = () => {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 1, 0],
    type: 'Dynamic',
  }));

  const { camera } = useThree();
  const pos = useRef<Triplet>([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
  }, [api.position]);

  const vel = useRef<Triplet>([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current = v;
    });
  });

  useFrame(() => {
    camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));
  });

  return <mesh ref={ref}></mesh>;
};
export default Player;
