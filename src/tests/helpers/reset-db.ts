import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export default async () => {
  await prisma.$transaction([prisma.user.deleteMany()]);
};
