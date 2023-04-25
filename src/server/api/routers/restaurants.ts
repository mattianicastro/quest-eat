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
    getRelevant: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.restaurant.findMany({
            take: 5,
            // order by rating
        });
    }),
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.restaurant.findMany();
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
});
