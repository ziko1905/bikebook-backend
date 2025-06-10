import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

type UserInfo = {
  firstName: string;
  lastName: string;
  password: string;
};

export const createUser = async (userInfo: UserInfo): Promise<void> => {
  await client.user.create({ data: userInfo });
};
