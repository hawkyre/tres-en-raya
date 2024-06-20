import { getScores } from '@/api/scores';

export async function GET(req: Request) {
  const scores = await getScores();
  return new Response(JSON.stringify(scores), { status: 200 });
}
