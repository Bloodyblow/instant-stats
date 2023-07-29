import { Value } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dayjs from "dayjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Value[]>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end("Unauthorized");

  const method = req.method;
  const { categoryId } = req.query;
  if (method === "GET") {
    const { startDate, endDate } = req.query;
    const start = dayjs(startDate as string).toISOString();
    const end = dayjs(endDate as string).toISOString();
    const values = await prisma.value.findMany({
      where: {
        categoryId: Number(categoryId),
        date: {
          gte: start,
          lte: end,
        },
      },
      orderBy: {
        date: "asc",
      },
    });

    return res.status(200).json(values);
  }
  return res.status(405).end("Method not allowed");
}
