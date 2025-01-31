'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Loading from '../components/Loading';

const WiFiCard = dynamic(() => import('../components/WiFiCard'), {
  loading: () => <Loading />,
  ssr: false
});

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <WiFiCard />
    </Suspense>
  );
}
