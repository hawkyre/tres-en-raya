interface SkeletonProps {
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width, height }) => {
  return (
    <div
      className='h-full w-full bg-gray-200 rounded-md animate-pulse'
      style={{ width, height }}
    />
  );
};
