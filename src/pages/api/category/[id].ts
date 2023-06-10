import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category | null>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end("Unauthorized");

  const { id } = req.query;
  switch (req.method) {
    case "GET":
      const category = await prisma.category.findUnique({
        where: {
          id: Number(id),
        },
        include: {
          values: true,
        },
      });
      return res.status(200).json(category);
    case "PUT":
      const { name, icon, unit } = req.body;
      const updatedCategory = await prisma.category.update({
        where: {
          id: Number(id),
        },
        data: {
          name,
          icon,
          unit,
        },
      });
      return res.status(200).json(updatedCategory);
    case "DELETE":
      const deletedCategory = await prisma.category.delete({
        where: {
          id: Number(id),
        },
        include: {
          values: true,
        },
      });
      return res.status(200).json(deletedCategory);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
