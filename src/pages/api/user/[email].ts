import { Value } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<null>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end("Unauthorized");

  const method = req.method;
  const { email } = req.query;

  if (method === "DELETE") {
    // delete user and all related data
    await prisma.user.delete({
      where: { email: email as string },
      include: {
        categories: {
          include: {
            values: true,
          },
        },
      },
    });
    return res.status(200).json(null);
  } else {
    return res.status(404).json(null);
  }
}
