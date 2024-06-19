/* eslint-disable react/no-unescaped-entities */
'use client';

import { classNames } from '@/utils/classNames';
import { useBoardContext } from '../context/BoardContext';
import { BoardShape } from './BoardShape';
import { useMemo } from 'react';
import { BoardState } from './BoardState';
import Link from 'next/link';

export const Board: React.FC = () => {
  const { boardState, onMove, restartGame, gameState } = useBoardContext();

  return (
    <div className='flex gap-8 items-center'>
      <div className='h-full py-8 flex flex-col gap-2 items-center justify-center'>
        <p className={classNames('self-start')}>AI</p>
        <div className='h-[calc(min(80vw,80vh))] grid grid-cols-3 grid-rows-3 rounded-lg overflow-hidden'>
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                className={classNames(
                  'h-full aspect-square',
                  index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'
                )}
                disabled={boardState[index] !== '_'}
                onClick={() => onMove(index)}
              >
                <BoardShape shape={boardState[index]} />
              </button>
            ))}
        </div>
        <p className='self-end'>You</p>
      </div>
      <div className='flex flex-col gap-8'>
        <Link
          href='/scores'
          className='border border-gray-800 rounded-md py-2 hover:bg-gray-100 transition text-center'
        >
          Check scores
        </Link>
        <BoardState />
        {gameState !== 'playing' && (
          <button
            className='border border-gray-800 rounded-md py-2 hover:bg-gray-100 transition'
            onClick={restartGame}
          >
            Play again
          </button>
        )}
      </div>
    </div>
  );
};
