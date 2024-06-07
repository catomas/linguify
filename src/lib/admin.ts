import { auth } from "@clerk/nextjs";

const allowedIds = ["user_2ebQVzJGLvrUNfmtcoTPJ4ypNQg"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return allowedIds.indexOf(userId) !== -1;
};
