import { createTRPCRouter } from "~/server/api/trpc";
import { restaurantsRouter } from "./routers/restaurants";
import { toursRouter } from "./routers/tours";
import { usersRouter } from "./routers/users";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    restaurants: restaurantsRouter,
    tours: toursRouter,
    users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
