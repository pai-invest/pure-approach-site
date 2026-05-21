'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PageContent() {
  const searchParams = useSearchParams();
  const bypass = searchParams.get('bypass');

  // If the secret code is there, show your real content
  if (bypass === 'secret') {
    return <div>INSERT YOUR REAL HOME PAGE CONTENT HERE</div>;
  }

  // Otherwise, show the Construction page
  return (
    <div style={{ backgroundColor: '#032213', minHeight: '100vh', color: '#F5D36B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <h1>PURE APPROACH INVESTMENTS - Under Construction</h1>
    </div>
  );
}

export default function Page() {
  return <Suspense><PageContent /></Suspense>;
}
