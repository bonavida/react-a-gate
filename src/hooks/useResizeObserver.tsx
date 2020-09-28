import { useRef, useLayoutEffect } from 'react';

const useResizeObserver = (target: Element, onResize: { (): void }): void => {
  const resizeObserver = useRef<ResizeObserver | null>(null);

  useLayoutEffect(() => {
    resizeObserver.current = new ResizeObserver(() => {
      onResize && onResize();
    });

    resizeObserver.current.observe(target);

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [onResize, target]);
};

export default useResizeObserver;
