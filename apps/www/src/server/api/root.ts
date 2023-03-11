import { createTRPCRouter } from "~/server/api/trpc";
import { bragsheetsRouter } from "./routers/bragsheets";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  bragsheets: bragsheetsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
