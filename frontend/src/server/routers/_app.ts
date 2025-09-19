import { router } from '@/lib/trpc/server';
import { indexRouter } from './index';

export const appRouter = router({
  index: indexRouter,
});

export type AppRouter = typeof appRouter;
