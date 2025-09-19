import { type CreateNextContextOptions } from '@trpc/server/adapters/next';

/**
 * Replace this with an object if you want to pass things down to all your procedures.
 */
export const createContext = async (opts: CreateNextContextOptions) => {
  return {};
};

export type Context = Awaited<ReturnType<typeof createContext>>;
