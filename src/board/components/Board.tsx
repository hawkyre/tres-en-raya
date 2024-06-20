/* eslint-disable react/no-unescaped-entities */
'use client';

import { classNames } from '@/utils/classNames';
import { useBoardContext } from '../context/BoardContext';
import { BoardShape } from './BoardShape';
import { useMemo } from 'react';
import { BoardState } from './BoardState';
import Link from 'next/link';
import { Button } from '@/common/components/Button';
import { StyledLink } from '@/common/components/StyledLink';

export const Board: React.FC = () => {
  const { boardState, onMove, restartGame, gameState, whoseTurn } =
    useBoardContext();

  return (
    <div className='grow flex md:flex-row flex-col gap-8 items-center justify-between h-full'>
      <div className='h-full flex flex-col gap-2 items-center justify-start md:justify-center'>
        <p className='self-start text-sm sm:text-lg text-red-500 font-bold'>
          AI (O)
        </p>
        <div className='h-[calc(min(100vw-4rem,50vh))] sm:h-[calc(min(100vw-4rem,70vh))] md:h-[calc(min(60vw,60vh))] xl:h-[calc(min(80vw,80vh))] aspect-square grid grid-cols-3 grid-rows-3 rounded-lg overflow-hidden'>
          {Array(9)
            .fill(0)
            .map((_, index) => (
              <button
                key={index}
                className={classNames(
                  'h-full shrink-0 aspect-square',
                  index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'
                )}
                disabled={
                  boardState[index] !== '_' ||
                  gameState !== 'playing' ||
                  whoseTurn !== 'player'
                }
                onClick={() => onMove(index)}
              >
                <BoardShape shape={boardState[index]} />
              </button>
            ))}
        </div>
        <p className='self-end text-sm sm:text-lg font-bold'>(X) You</p>
      </div>
      <div className='flex flex-col sm:flex-row md:flex-col items-center gap-4 sm:gap-8'>
        <StyledLink href='/scores'>Check scores</StyledLink>
        <BoardState />
        {gameState !== 'playing' && (
          <Button onClick={restartGame}>Play again</Button>
        )}
      </div>
    </div>
  );
};
