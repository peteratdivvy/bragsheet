import prisma from "@/lib/prisma";
import { createHandler } from "@/utils/api";

const apiRoute = createHandler(async (req, res) => {
  const userId = req.userId;
  const bragSheetList = await prisma.bragSheet.findMany({
    where: {
      userId,
    },
  });

  if (!bragSheetList) {
    res.status(404).json({ message: "Brag sheet not found" });
    return;
  }

  res.json({
    sheets: bragSheetList,
  });
});

export default apiRoute;
