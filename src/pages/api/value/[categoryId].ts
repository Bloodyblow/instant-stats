import { Value } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Value | null>
) {
  const method = req.method;
  if (method === "POST") {
    const { categoryId } = req.query;
    const { date, value } = req.body;
    const newValue = await prisma.value.create({
      data: {
        date,
        value,
        category: { connect: { id: parseInt(categoryId as string) } },
      },
    });
    return res.status(200).json(newValue);
  } else if (method === "DELETE") {
    const { valueId } = req.query;
    const deletedValue = await prisma.value.delete({
      where: { id: parseInt(valueId as string) },
    });
    return res.status(200).json(deletedValue);
  } else if (method === "PUT") {
    const { valueId } = req.query;
    const { date, value } = req.body;
    const updatedValue = await prisma.value.update({
      where: { id: parseInt(valueId as string) },
      data: { date, value },
    });
    return res.status(200).json(updatedValue);
  } else if (method === "GET") {
    const { valueId } = req.query;
    const value = await prisma.value.findUnique({
      where: { id: parseInt(valueId as string) },
    });
    return res.status(200).json(value);
  } else {
    return res.status(404).json(null);
  }
}
