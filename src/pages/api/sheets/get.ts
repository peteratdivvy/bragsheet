import prisma from "@/lib/prisma";
import { createHandler } from "@/utils/api";

const apiRoute = createHandler(async (req, res) => {
  const userId = req.userId;
  const bragsheets = await prisma.bragSheet.findMany({
    where: {
      userId,
    },
    include: {
      _count: true,
    },
  });

  const bragSheetList = bragsheets.map((bragSheet) => ({
    ...bragSheet,
    id: bragSheet.id,
    title: bragSheet.title,
    bragCount: bragSheet._count.brags,
  }));

  res.json({
    sheets: bragSheetList,
  });
});

export default apiRoute;
