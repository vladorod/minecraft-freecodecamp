import { Triplet, useSphere } from '@react-three/cannon';
import { MeshProps, useFrame, useThree } from '@react-three/fiber';
import { FC, ReactElement, useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import * as I from './Player.interface';
import { useKeyboard } from '../../hooks/useKeyboard';

const JUMP_FORCE = 6;
const SPEED = 3;

const Player: FC<I.Props> = ({}): ReactElement<MeshProps> => {
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

  const { jump, moveForward, moveBackward, moveLeft, moveRight } = useKeyboard();

  useFrame(() => {
    const direction = new Vector3();

    const frontVector = new Vector3(0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0));

    const sideVector = new Vector3((moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0);

    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.05) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2]);
    }

    camera.position.copy(new Vector3(pos.current[0], pos.current[1], pos.current[2]));
  });

  useEffect(() => {}, []);

  return <mesh ref={ref}></mesh>;
};
export default Player;
