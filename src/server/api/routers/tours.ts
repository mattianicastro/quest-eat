import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const toursRouter = createTRPCRouter({
    getTours: publicProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.tour.findMany({
            include: {
                createdBy: true,
                TourStop: {
                    include: {
                        restaurant: true,
                    },
                },
            },
        });
    }),

    getTour: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.tour.findUnique({
                where: {
                    id: input.id,
                },
                include: {
                    createdBy: true,
                    TourStop: {
                        include: {
                            restaurant: true,
                        },
                    },
                },
            });
        }),

    createTour: protectedProcedure
        .input(
            z.object({
                name: z.string().max(100),
                description: z.string().max(1000).optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const data = await ctx.prisma.tour.create({
                data: {
                    name: input.name,
                    description: input.description,
                    createdBy: {
                        connect: {
                            id: ctx.session.user.id,
                        },
                    },
                },
            });
            return {
                ok: true,
                tourId: data.id,
            };
        }),
    deleteTour: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const res = await ctx.prisma.tour.deleteMany({
                where: {
                    id: input.id,
                    createdBy: {
                        id: ctx.session.user.id,
                    },
                },
            });
            if (res.count === 0) {
                return {
                    ok: false,
                    error: "Tour not found",
                };
            }
            return {
                ok: true,
            };
        }),

    deleteStop: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const res = await ctx.prisma.tourStop.deleteMany({
                where: {
                    id: input.id,
                    tour: {
                        createdBy: {
                            id: ctx.session.user.id,
                        },
                    },
                },
            });
            if (res.count === 0) {
                return {
                    ok: false,
                    error: "Stop not found",
                };
            }
            return {
                ok: true,
            };
        }),

    createStop: protectedProcedure
        .input(
            z.object({
                tourId: z.string(),
                restaurantId: z.string(),
                description: z.string().max(1000).optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const res = await ctx.prisma.tour.findFirst({
                where: {
                    id: input.tourId,
                    createdBy: {
                        id: ctx.session.user.id,
                    },
                },
            });
            if (!res) {
                return {
                    ok: false,
                    error: "Tour not found",
                };
            }

            await ctx.prisma.tourStop.create({
                data: {
                    description: input.description,
                    tour: {
                        connect: {
                            id: input.tourId,
                        },
                    },
                    restaurant: {
                        connect: {
                            id: input.restaurantId,
                        },
                    },
                },
            });

            return {
                ok: true,
            };
        }),
});
