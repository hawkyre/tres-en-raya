'use client';

import { getBoardResult } from '@/api/gameAI';
import { revalidatePath } from 'next/cache';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { getLinePositionsForWin } from '../utils/getLinePositionsForWin';

export interface WinningLine {
  fromIndex: number;
  toIndex: number;
  winner: string;
}

// Define the shape of the context's state
interface BoardContextState {
  boardState: string;
  onMove: (index: number) => void;
  gameState: string;
  restartGame: () => void;
  whoseTurn: 'player' | 'ai';
  winningLines: WinningLine[];
}

// Create the context with a default value
const BoardContext = createContext<BoardContextState>({
  boardState: '_________',
  onMove: () => {},
  gameState: 'playing',
  restartGame: () => {},
  whoseTurn: 'player',
  winningLines: [],
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
  const [winningLines, setWinningLines] = useState<WinningLine[]>([]);

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

    // Just for faster display of results, still need to call server for DB store
    if (gameRes !== 'playing') {
      setGameState(gameRes);
      if (gameRes === 'player1') {
        const lines = getLinePositionsForWin(newBoard);
        setWinningLines(
          lines.map(([fromIndex, toIndex, winner]) => ({
            fromIndex,
            toIndex,
            winner,
          }))
        );
      }
    }

    fetch(`/api/ai/move`, {
      method: 'POST',
      body: JSON.stringify({ board: newBoard }),
    }).then(async (res) => {
      if (res.status === 201) {
        const { nextBoard, result } = await res.json();
        setGameState(result);
        setBoard(nextBoard);

        console.log(nextBoard, result);

        if (result === 'player2') {
          const lines = getLinePositionsForWin(nextBoard);
          console.log(lines);
          setWinningLines(
            lines.map(([fromIndex, toIndex, winner]) => ({
              fromIndex,
              toIndex,
              winner,
            }))
          );
        }
      }
    });
  };

  const restartGame = () => {
    setBoard('_________');
    setGameState('playing');
    setWinningLines([]);
  };

  const whoseTurn = useMemo(
    () =>
      Array.from(board).filter((char) => char !== '_').length % 2 === 1
        ? 'ai'
        : 'player',
    [board]
  );

  return (
    <BoardContext.Provider
      value={{
        boardState: board,
        gameState,
        onMove,
        restartGame,
        whoseTurn,
        winningLines,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

// Custom hook for using the context
export const useBoardContext = () => useContext(BoardContext);
