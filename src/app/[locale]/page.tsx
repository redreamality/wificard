'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../../components/Loading';
import { useSearchParams } from 'next/navigation';

const WiFiCard = dynamic(() => import('../../components/WiFiCard'), {
  loading: () => <Loading />,
  ssr: false
});

export default function Home() {
  const searchParams = useSearchParams();
  const scene = searchParams.get('scene');

  return (
    <Suspense fallback={<Loading />}>
      <WiFiCard scene={scene} />
    </Suspense>
  );
} 