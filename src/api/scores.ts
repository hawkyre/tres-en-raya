import prisma from '@/prisma/prisma';

export const getScores = async () => {
  const scores = await prisma.scores.groupBy({
    by: ['winner'],
    _count: {
      winner: true,
    },
  });

  const scoreMap = scores.reduce(
    (acc, { winner, _count: { winner: scoreCount } }) => {
      acc[winner] = scoreCount;
      return acc;
    },
    {} as Record<string, number>
  );

  return scoreMap;
};

export const createScore = async (score: {
  winner: string;
  final_board: string;
}) => {
  await prisma.scores.create({
    data: score,
  });
};
