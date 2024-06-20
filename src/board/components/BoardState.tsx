import { useMemo } from 'react';
import { useBoardContext } from '../context/BoardContext';

interface BoardStateProps {}

export const BoardState: React.FC<BoardStateProps> = () => {
  const { gameState, boardState, whoseTurn } = useBoardContext();

  const gameStateText = useMemo(() => {
    if (gameState === 'playing') {
      return whoseTurn === 'ai' ? "AI's turn" : 'Your turn';
    }
    if (gameState === 'player2') {
      return 'AI won!';
    }
    if (gameState === 'player1') {
      return 'You won!';
    }
    return "It's a draw";
  }, [gameState, whoseTurn]);

  return (
    <div className='w-52 bg-gray-100 flex flex-col items-center justify-center rounded-md overflow-hidden'>
      <span className='w-full text-center text-gray-100 py-2 bg-gray-800'>
        {gameState === 'playing' ? 'Game in progress' : 'Game over'}
      </span>
      <span className='w-full text-center text-gray-800 py-2 bg-gray-100'>
        {gameStateText}
      </span>
    </div>
  );
};
