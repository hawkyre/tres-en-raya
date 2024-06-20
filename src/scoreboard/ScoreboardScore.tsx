import { Skeleton } from '@/common/components/Skeleton';

interface ScoreboardScoreProps {
  title: string;
  value: number;
}

export const ScoreboardScore: React.FC<ScoreboardScoreProps> = ({
  title,
  value,
}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2'>
      <div className='text-xl lg:text-2xl'>{title}</div>
      <div className='text-3xl lg:text-4xl flex gap-2 items-center'>
        {value ?? <Skeleton width='45px' />} games
      </div>
    </div>
  );
};
