import { publicProcedure, router } from '@/lib/trpc/server';
import { z } from 'zod';

export const indexRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
});
