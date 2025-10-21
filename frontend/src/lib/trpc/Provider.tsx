'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react';
import { trpc } from './client';
const trpcAny: any = trpc;
import superjson from 'superjson';

export default function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpcAny.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: '/api/trpc',
        }),
      ],
    })
  );
  return (
    <trpcAny.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcAny.Provider>
  );
}
