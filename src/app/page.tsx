'use client';

import { Board } from '@/board/components/Board';
import { BoardContextProvider } from '@/board/context/BoardContext';

export default function Home() {
  return (
    <main className='flex min-h-screen w-screen flex-col items-center px-8 md:p-0 py-8'>
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
    </main>
  );
}
