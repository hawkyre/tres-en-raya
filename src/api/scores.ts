import prisma from '@/prisma/prisma';

export const getScores = async () => {
  const scores = await prisma.scores.findMany();

  return scores;
};

export const createScore = async (score: {
  winner: string;
  final_board: string;
}) => {
  await prisma.scores.create({
    data: score,
  });
};
