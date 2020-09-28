import { useCallback, useEffect } from 'react';

const useEscKeydown = (onEscKeydown: { (): void }): void => {
  const onEscKeyDownCallback = useCallback(
    (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      onEscKeydown && onEscKeydown();
    },
    [onEscKeydown]
  );

  useEffect(() => {
    window.addEventListener('keydown', onEscKeyDownCallback);

    return () => {
      window.removeEventListener('keydown', onEscKeyDownCallback);
    };
  }, [onEscKeyDownCallback]);
};

export default useEscKeydown;
