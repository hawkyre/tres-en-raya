import React, { createContext, useContext, useState } from 'react';

// Define the shape of the context's state
interface BoardContextState {
  boardState: string;
  onMove: (x: number, y: number) => void;
}

// Create the context with a default value
const BoardContext = createContext<BoardContextState>({
  boardState: '_________',
  onMove: () => {},
});

// Create a provider component
interface BoardContextProviderProps {
  children: React.ReactNode;
}

export const BoardContextProvider: React.FC<BoardContextProviderProps> = ({
  children,
}) => {
  const [board, setBoard] = useState('_________');

  const onMove = (x: number, y: number) => {
    const index = y * 3 + x;
    setBoard((prevBoard) => {
      const newBoard = prevBoard.replace(/./g, '_');
      return newBoard.substring(0, index) + 'X' + newBoard.substring(index + 1);
    });
  };

  return (
    <BoardContext.Provider
      value={{
        boardState: board,
        onMove,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

// Custom hook for using the context
export const useBoardContext = () => useContext(BoardContext);
