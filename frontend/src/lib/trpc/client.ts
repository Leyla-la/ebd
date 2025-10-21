import { createTRPCReact } from '@trpc/react-query';

// During frontend-only type checking the backend router types may not be available.
// Fall back to `any` so the frontend can build while preserving trpc usage.
export const trpc = createTRPCReact<any>({});
