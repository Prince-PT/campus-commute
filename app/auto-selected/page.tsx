'use client';

import AutoSelectedpage from '@/components/AutoSelectedpage';
import { Suspense } from 'react';

export default function AutoSelected() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <AutoSelectedpage />
      </Suspense>
    </main>
  );
}
