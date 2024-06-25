import { validateBoard, getBoardResult, getNextBoardMove } from '@/api/gameAI';
import { createScore } from '@/api/scores';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { board } = await req.json();

    if (!board || typeof board !== 'string') {
      return new Response('Invalid board', { status: 400 });
    }

    if (!validateBoard(board)) {
      return new Response('Invalid board', { status: 400 });
    }

    // We create an internal representation to make it easier to work with
    const resultPre = getBoardResult(board);

    if (resultPre !== 'playing') {
      await createScore({
        winner: resultPre,
        final_board: board,
      });

      return new Response(
        JSON.stringify({ nextBoard: board, result: resultPre }),
        { status: 201 }
      );
    }

    const nextBoard = getNextBoardMove(board);
    const resultPost = getBoardResult(nextBoard);

    if (resultPost !== 'playing') {
      await createScore({
        winner: resultPost,
        final_board: board,
      });
    }

    return new Response(JSON.stringify({ nextBoard, result: resultPost }), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response('Error', { status: 400 });
  }
}
