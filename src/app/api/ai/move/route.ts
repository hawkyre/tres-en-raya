import { NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { board: string } }
) {
  const board = params.board;

  if (!board || typeof board !== 'string') {
    return new Response('Invalid board', { status: 400 });
  }

  if (!validateBoard(board)) {
    return new Response('Invalid board', { status: 400 });
  }

  const nextBoard = getNextBoardMove(board);

  return new Response(JSON.stringify({ nextBoard }), { status: 200 });
}

const validateBoard = (board: string) => {
  return /[_OX]{9}/.test(board);
};

const getNextBoardMove = (board: string) => {
  // Try to find 2 Xs horizontally
  const horizontalXIndex = /XX/.exec(board)?.index;
  let nextMoveIndex = -1;

  if (horizontalXIndex) {
    nextMoveIndex =
      horizontalXIndex % 3 === 0 ? horizontalXIndex + 2 : horizontalXIndex - 1;
  }

  // Try to find 2 Xs vertically
  const verticalXIndex = /X..X/.exec(board)?.index;
  if (nextMoveIndex !== -1 && verticalXIndex) {
    nextMoveIndex =
      verticalXIndex / 3 < 1 ? verticalXIndex + 6 : verticalXIndex - 3;
  }

  // Random index to move to
  if (nextMoveIndex === -1) {
    const randomPossiblePositions = board
      .split('')
      .flatMap((play, i) => (play === '_' ? [i] : []));

    nextMoveIndex =
      randomPossiblePositions[
        Math.floor(Math.random() * randomPossiblePositions.length)
      ];
  }

  return (
    board.substring(0, nextMoveIndex) + 'O' + board.substring(nextMoveIndex + 1)
  );
};
