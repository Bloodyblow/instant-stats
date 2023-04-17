import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[] | Category>
) {
  const { id } = req.query;
  switch (req.method) {
    case "GET":
      const category = await prisma.category.findUnique({
        where: {
          id: Number(id),
        },
      });
      break;
    default:
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
