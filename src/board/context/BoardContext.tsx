'use client';

import { getBoardResult } from '@/api/gameAI';
import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context's state
interface BoardContextState {
  boardState: string;
  onMove: (index: number) => void;
  gameState: string;
  restartGame: () => void;
}

// Create the context with a default value
const BoardContext = createContext<BoardContextState>({
  boardState: '_________',
  onMove: () => {},
  gameState: 'playing',
  restartGame: () => {},
});

// Create a provider component
interface BoardContextProviderProps {
  children: React.ReactNode;
}

export const BoardContextProvider: React.FC<BoardContextProviderProps> = ({
  children,
}) => {
  const [board, setBoard] = useState('_________');
  const [gameState, setGameState] = useState('playing');

  const onMove = (index: number) => {
    const newBoard =
      board.substring(0, index) + 'X' + board.substring(index + 1);

    setBoard((prevBoard) => {
      // Set again inside setstate in case of side effects
      return (
        prevBoard.substring(0, index) + 'X' + prevBoard.substring(index + 1)
      );
    });

    let gameRes = getBoardResult(newBoard);

    if (gameRes !== 'playing') {
      setGameState(gameRes);
    } else {
      fetch(`/api/ai/move?board=${newBoard}`, {
        method: 'GET',
      }).then(async (res) => {
        console.log(res);
        if (res.status === 200) {
          const { nextBoard, result } = await res.json();
          setGameState(result);
          setBoard(nextBoard);
        }
      });
    }
  };

  const restartGame = () => {
    setBoard('_________');
    setGameState('playing');
  };

  return (
    <BoardContext.Provider
      value={{
        boardState: board,
        gameState,
        onMove,
        restartGame,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

// Custom hook for using the context
export const useBoardContext = () => useContext(BoardContext);
