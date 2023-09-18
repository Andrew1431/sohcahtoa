import { MutableRefObject, createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { CanvasManager } from '../classes/CanvasManager';

export const CanvasContext = createContext<{
  canvasRef: MutableRefObject<HTMLCanvasElement>
}>(null!);

export const useCanvas = () => useContext(CanvasContext);

export const useCanvasManager = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const wrapperRef = useRef<HTMLDivElement>(null!);
  const managerRef = useRef<CanvasManager>(null!);

  const size = useCallback(() => {
    const rect = wrapperRef.current.getBoundingClientRect();
    canvasRef.current.width = Math.floor(rect.width);
    canvasRef.current.height = Math.floor(rect.height);
    managerRef.current.rerender();
  }, []);

  useLayoutEffect(() => {
    managerRef.current = new CanvasManager(canvasRef.current);
    size();
  }, [size]);

  const onResize = useCallback(() => {
    requestAnimationFrame(size);
  }, [size]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  const value = useMemo(() => ({ canvasRef }), []);

  return {
    canvasRef,
    wrapperRef,
    value
  }
};
