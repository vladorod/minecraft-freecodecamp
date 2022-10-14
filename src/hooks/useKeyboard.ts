import { useCallback, useEffect, useState } from 'react';

type TKey = 'moveForward' | 'moveBackward' | 'moveLeft' | 'moveRight' | 'jump';

const actionByKey = (key: TKey): string | undefined => {
  const keyActionMap: { [key: string]: TKey } = {
    KeyW: 'moveForward',
    KeyS: 'moveBackward',
    KeyA: 'moveLeft',
    KeyD: 'moveRight',
    Space: 'jump',
  };
  return keyActionMap[key];
};

export const useKeyboard = () => {
  const [movement, setMovement] = useState<{ [key in TKey]: boolean }>({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const pressedKey = actionByKey(event.code as TKey);
    if (pressedKey) {
      setMovement((prevState) => ({
        ...prevState,
        [pressedKey]: true,
      }));
    }
  }, []);

  const handleKeyUp = useCallback((event) => {
    const pressedKey = actionByKey(event.code as TKey);
    if (pressedKey) {
      setMovement((prevState) => ({
        ...prevState,
        [pressedKey]: false,
      }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  return movement;
};
