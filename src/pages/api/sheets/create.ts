// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestBody = {
  title: string;
  userId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { title, userId } = req.body as RequestBody;

  const bragSheet = await prisma.bragSheet.create({
    data: {
      title,
      User: { connect: { id: userId } },
    },
  });

  res.json({ message: `The brag sheet ${bragSheet.title} was created` });
}
