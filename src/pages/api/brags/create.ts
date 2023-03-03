// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createHandler } from "@/utils/api";
import prisma from "@prisma";
import { Brag } from "@prisma/client";

type RequestBody = Brag;

const createBragHandler = createHandler(async (req, res) => {
  const userId = req.userId;
  const { content, bragSheetId, title } = req.body as RequestBody;

  const createdBrag = await prisma.brag.create({
    data: {
      title,
      content,
      bragSheetId,
      userId,
    },
  });

  res.status(200).json({ ok: true, id: createdBrag.id });
});

export default createBragHandler;
