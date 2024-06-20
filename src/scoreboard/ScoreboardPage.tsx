import { Skeleton } from '@/common/components/Skeleton';
import { StyledLink } from '@/common/components/StyledLink';
import { ScoreboardScore } from './ScoreboardScore';

/* eslint-disable react/no-unescaped-entities */
interface ScoreboardPageProps {
  scores: Record<string, number>;
}

export const ScoreboardPage: React.FC<ScoreboardPageProps> = ({ scores }) => {
  return (
    <div className='flex flex-col items-center justify-center gap-8 h-screen'>
      <h1 className='text-7xl'>Your match scores</h1>
      <div className='grid grid-cols-3 w-[800px]'>
        <ScoreboardScore title="✅ You've won" value={scores['player1']} />
        <ScoreboardScore title="❌ You've lost" value={scores['player2']} />
        <ScoreboardScore title="🟰 You've drawn" value={scores['draw']} />
      </div>
      <StyledLink href='/'>Keep playing</StyledLink>
    </div>
  );
};
