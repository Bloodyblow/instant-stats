import { Category } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Category[]>
) {
  const session = await getServerSession(req, res, authOptions);
  const sessionId = session?.user?.email;
  if (!sessionId) return res.status(401).end("Unauthorized");

  const categories = await prisma.category.findMany({
    where: { user: { email: sessionId } },
  });
  res.status(200).json(categories);
}
