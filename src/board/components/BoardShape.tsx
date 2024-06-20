'use client';

interface BoardProps {
  shape: string;
}

export const BoardShape: React.FC<BoardProps> = ({ shape }) => {
  switch (shape) {
    case 'X':
      return (
        <div className='h-full w-full text-black flex items-center justify-center text-8xl sm:text-9xl'>
          X
        </div>
      );
    case 'O':
      return (
        <div className='h-full w-full text-red-500 flex items-center justify-center text-8xl sm:text-9xl'>
          O
        </div>
      );
    default:
      return <></>;
  }
};
