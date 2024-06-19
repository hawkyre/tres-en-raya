import prisma from '@/prisma/prisma';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const scores = await prisma.scores.groupBy({
      by: ['score'],
      _sum: {
        score: true,
      },
    });

    const scoreMap = scores.reduce(
      (acc, { score, _sum: { score: scoreCount } }) => {
        acc[score] = scoreCount ?? 0;
        return acc;
      },
      {} as Record<string, number>
    );

    return new Response(JSON.stringify({ scores }), { status: 200 });
  } catch (error) {
    console.error(error);

    return new Response('', { status: 400 });
  }
}
