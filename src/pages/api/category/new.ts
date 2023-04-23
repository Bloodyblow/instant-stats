import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category | null>
) {
  const { name, unit, icon } = req.body;
  const newCategory = await prisma.category.create({
    data: { name, icon, unit },
  });
  return res.status(200).json(newCategory);
}
