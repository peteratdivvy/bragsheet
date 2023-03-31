import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const bragsheetsRouter = createTRPCRouter({
  hasBrags: protectedProcedure.query(async ({ ctx }) => {
    const bragCount = await ctx.prisma.bragSheet.count({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return bragCount > 0;
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.bragSheet.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        _count: {
          select: {
            brags: true,
          },
        },
      },
    });
  }),

  byId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      // Fetch the bragsheet by ID using your data fetching logic
      // For example, using Prisma:
      return ctx.prisma.bragSheet.findUnique({
        where: { id: input.id },
        include: { brags: true },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.bragSheet.create({
        data: {
          title: input.title,
          description: input.description,
          User: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
});
