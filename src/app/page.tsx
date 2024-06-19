'use client';

import { Board } from '@/board/components/Board';
import { BoardContextProvider } from '@/board/context/BoardContext';

export default function Home() {
  return (
    <main className='flex h-screen w-screen flex-col items-center justify-center'>
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
    </main>
  );
}
