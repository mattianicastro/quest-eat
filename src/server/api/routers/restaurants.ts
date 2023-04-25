import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const restaurantsRouter = createTRPCRouter({
    createRestaurant: protectedProcedure
        .input(
            z.object({
                name: z.string().max(100),
                address: z.string().max(500),
                city: z.string().max(100),
                state: z.string().max(100),
                zip: z.string().max(20),
                lat: z.number().min(-90).max(90),
                lng: z.number().min(-180).max(180),
                phone: z.string().max(100).optional(),
                website: z.string().url().optional(),
                email: z.string().email().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            return await ctx.prisma.restaurant.create({
                data: {
                    name: input.name,
                    address: input.address,
                    city: input.city,
                    state: input.state,
                    zip: input.zip,
                    lat: input.lat,
                    lng: input.lng,
                    phone: input.phone,
                    website: input.website,
                    email: input.email,
                    createdBy: {
                        connect: {
                            id: ctx.session.user.id,
                        },
                    },
                },
            });
        }),
    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const res = await ctx.prisma.restaurant.deleteMany({
                where: {
                    createdBy: {
                        id: ctx.session.user.id,
                    },
                    id: input.id,
                },
            });
            return {
                ok: res.count > 0,
            };
        }),
    getRelevant: publicProcedure
        .input(
            z.object({
                name: z.string().optional(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.restaurant.findMany({
                take: 10,
                where: {
                    name: {
                        contains: input.name,
                    },
                },
                // order by rating
            });
        }),
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.restaurant.findMany({
            include: {
                createdBy: true,
            },
        });
    }),

    getOwn: protectedProcedure
        .input(
            z.object({
                id: z.string().optional(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.restaurant.findMany({
                where: {
                    createdBy: {
                        id: ctx.session.user.id,
                    },
                    id: input.id,
                },
            });
        }),

    getWithRatings: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.review.aggregate({
                _avg: {
                    rating: true,
                },
                where: {
                    restaurant: {
                        id: input.id,
                    },
                },
            });
        }),

    get: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.restaurant.findUnique({
                where: {
                    id: input.id,
                },
            });
        }),
    setReview: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                rating: z.number().min(1).max(5),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.review.upsert({
                where: {
                    userId_restaurantId: {
                        userId: ctx.session.user.id,
                        restaurantId: input.id,
                    },
                },
                create: {
                    rating: input.rating,
                    restaurant: {
                        connect: {
                            id: input.id,
                        },
                    },
                    createdBy: {
                        connect: {
                            id: ctx.session.user.id,
                        },
                    },
                },
                update: {
                    rating: input.rating,
                },
                select: {
                    rating: true,
                },
            });
        }),
    getReviews: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.review.aggregate({
                where: {
                    restaurant: {
                        id: input.id,
                    },
                },
                _avg: {
                    rating: true,
                },
            });
        }),
});
