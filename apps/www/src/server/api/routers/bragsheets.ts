import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const bragsheetsRouter = createTRPCRouter({
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
