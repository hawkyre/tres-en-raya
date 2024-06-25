import { connect } from '../../mongo/mongodb';

export const getScores = async () => {
  const client = await connect();

  const scores = await client.Scores.find({});
  const scoreMap = scores.reduce((acc, { winner }) => {
    acc[winner] = acc[winner] ? acc[winner] + 1 : 1;
    return acc;
  }, {} as Record<string, number>);

  scoreMap['player1'] ??= 0;
  scoreMap['player2'] ??= 0;
  scoreMap['draw'] ??= 0;

  return scoreMap;
};

export const createScore = async (score: {
  winner: string;
  final_board: string;
}) => {
  const client = await connect();

  await client.Scores.create(score);
};
