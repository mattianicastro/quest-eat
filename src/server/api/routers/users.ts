import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
    getUser: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.prisma.user.findUnique({
                where: {
                    id: input.id,
                },
                select: {
                    id: true,
                    image: true,
                    name: true,
                    Tour: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                    Restaurant: {
                        select: {
                            name: true,
                            id: true,
                        },
                    },
                },
            });
        }),
});
