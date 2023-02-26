// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createHandler } from "@/utils/api";
import prisma from "@prisma";

type RequestBody = {
  title: string;
  userId: string;
};

const apiRoute = createHandler(async (req, res) => {
  const userId = req.userId;
  const { title } = req.body as RequestBody;

  const createdBragSheet = await prisma.bragSheet.create({
    data: {
      title,
      User: { connect: { id: userId } },
    },
  });

  res.status(200).json({ ok: true, id: createdBragSheet.id });
});

export default apiRoute;
