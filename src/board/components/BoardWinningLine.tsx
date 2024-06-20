import { useEffect, useMemo, useRef } from 'react';
import { WinningLine } from '../context/BoardContext';

interface BoardWinningLineProps extends WinningLine {}

export const BoardWinningLine: React.FC<BoardWinningLineProps> = ({
  fromIndex,
  toIndex,
  winner,
}) => {
  const side = 1000;

  useEffect(() => {
    const canvas = document.getElementById(
      `board-canvas-${fromIndex}${toIndex}`
    ) as HTMLCanvasElement;
    if (!canvas) return;

    const sideLength = side;

    const lineBeginningPercentX = 1 / 6 + (fromIndex % 3) * (1 / 3);
    const lineBeginningPercentY = 1 / 6 + Math.floor(fromIndex / 3) * (1 / 3);

    const lineEndPercentX = 1 / 6 + (toIndex % 3) * (1 / 3);
    const lineEndPercentY = 1 / 6 + Math.floor(toIndex / 3) * (1 / 3);

    const x1 = lineBeginningPercentX * (sideLength ?? 0);
    const y1 = lineBeginningPercentY * (sideLength ?? 0);

    const x2 = lineEndPercentX * (sideLength ?? 0);
    const y2 = lineEndPercentY * (sideLength ?? 0);

    const color =
      winner === 'O' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(0, 0, 0, 0.5)';

    const ctx = canvas.getContext('2d')!;

    console.log(x1, y1, x2, y2, color);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = side / 166;
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.stroke();
  }, [fromIndex, toIndex, winner]);

  return (
    <canvas
      id={`board-canvas-${fromIndex}${toIndex}`}
      height={side}
      width={side}
      className='absolute top-0 left-0 h-full w-full'
    ></canvas>
  );
};
