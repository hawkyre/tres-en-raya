import prisma from '@/prisma/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const scores = await prisma.scores.groupBy({
      by: ['winner'],
      _count: {
        winner: true,
      },
    });

    const scoreMap = scores.reduce(
      (acc, { winner, _count: { winner: scoreCount } }) => {
        acc[winner] = scoreCount ?? 0;
        return acc;
      },
      {} as Record<string, number>
    );

    return new Response(JSON.stringify({ scores: scoreMap }), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response('', { status: 400 });
  }
}
