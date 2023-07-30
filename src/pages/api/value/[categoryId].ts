import { Value } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Value | null>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end("Unauthorized");

  const method = req.method;
  const { categoryId } = req.query;
  if (method === "POST") {
    const { date, value } = req.body;

    const existingValue = await prisma.value.findFirst({
      where: { date, categoryId: parseInt(categoryId as string) },
    });
    if (existingValue) {
      const updatedValue = await prisma.value.update({
        where: { id: existingValue.id },
        data: { value },
      });
      return res.status(200).json(updatedValue);
    }

    const newValue = await prisma.value.create({
      data: {
        date,
        value,
        category: { connect: { id: parseInt(categoryId as string) } },
      },
    });
    return res.status(200).json(newValue);
  } else if (method === "DELETE") {
    const { valueId } = req.body;
    const deletedValue = await prisma.value.delete({
      where: { id: parseInt(valueId as string) },
    });
    return res.status(200).json(deletedValue);
  } else if (method === "PUT") {
    const { date, value, id } = req.body;
    const updatedValue = await prisma.value.update({
      where: { id: parseInt(id as string) },
      data: { date, value },
    });
    return res.status(200).json(updatedValue);
  } else {
    return res.status(404).json(null);
  }
}
