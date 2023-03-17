import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const bragsRouter = createTRPCRouter({
  hasBrags: protectedProcedure.query(async ({ ctx }) => {
    const bragCount = await ctx.prisma.bragSheet.count({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return bragCount > 0;
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
      return ctx.prisma.brag.findUnique({
        where: { id: input.id },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        bragsheetId: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.brag.create({
        data: {
          title: input.title,
          content: input.content,
          bragSheetId: input.bragsheetId,
          userId: ctx.session.user.id,
          source: "SITE",
        },
      });
    }),
});
