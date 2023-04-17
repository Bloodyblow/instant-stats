import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[]>
) {
  const categories = await prisma.category.findMany();
  res.status(200).json(categories);
}
