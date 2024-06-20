'use client';

import { ScoreboardPage } from '@/scoreboard/ScoreboardPage';
import { useEffect, useState } from 'react';

interface PageProps {}

const Page: React.FC<PageProps> = () => {
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('/api/scores')
      .then((res) => res.json())
      .then((data) => setScores(data));
  }, []);

  return <ScoreboardPage scores={scores} />;
};

export default Page;
