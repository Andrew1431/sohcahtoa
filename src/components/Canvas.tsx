import { forwardRef } from 'react';

export const Canvas = forwardRef<HTMLCanvasElement>((_, ref) => {
  return (
    <canvas ref={ref} />
  );
});
