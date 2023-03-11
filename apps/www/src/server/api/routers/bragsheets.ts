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
