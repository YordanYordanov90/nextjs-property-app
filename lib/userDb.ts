"use serer";

import { prisma } from "./prisma";
import { currentUser } from "@clerk/nextjs/server";

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const logedInUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (logedInUser) {
    return logedInUser;
  }

  const newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      email: user.emailAddresses[0].emailAddress,
      username: user.firstName || "",
      image: user.imageUrl || "",
    },
  });
  return newUser;
};
