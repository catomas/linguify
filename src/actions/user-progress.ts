"use server";

import db from "@/db/drizzle";
import {
  getCourseById,
  getUserProgress,
  getUserSubscriptions,
} from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { POINTS_TO_REFILL_HEARTS } from "@/constants";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("User not found or Unauthorized");
  }

  const courses = await getCourseById(courseId);

  if (!courses) {
    throw new Error("Course not found");
  }

  if (!courses.units.length || !courses.units[0].lessons.length) {
    throw new Error("Course has no units");
  }

  const existingUserProgress = await getUserProgress();

  if (existingUserProgress) {
    await db.update(userProgress).set({
      activateCourseId: courseId,
      userName: user.firstName || "User",
      userImageSrc: user.imageUrl || "/pet.png",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
  }

  await db.insert(userProgress).values({
    userId,
    activateCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/pet.png",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};

export const reduceHearts = async (challengeId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const currentUserProgress = await getUserProgress();
  const userSubscription = await getUserSubscriptions();

  const existingChallengeProgress = await db.query.challengeProgress.findFirst({
    where: and(
      eq(challengeProgress.userId, userId),
      eq(challengeProgress.challengeId, challengeId)
    ),
  });

  const isPractice = !!existingChallengeProgress;

  if (isPractice) {
    return { error: "practice" };
  }

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (userSubscription?.isActive) {
    return { error: "subscription" };
  }

  const challenge = await db.query.challenges.findFirst({
    where: eq(challenges.id, challengeId),
  });

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  if (currentUserProgress.hearts === 0) {
    return { error: "hearts" };
  }

  await db
    .update(userProgress)
    .set({
      hearts: Math.max(currentUserProgress.hearts - 1, 0),
    })
    .where(eq(userProgress.userId, userId));

  revalidatePath("/learn");
  revalidatePath(`/lesson/${challenge.lessonId}`);
  revalidatePath("/quests");
  revalidatePath("/shop");
  revalidatePath("/leaderboard");
};

export const refillHearts = async () => {
  const currentUserProgress = await getUserProgress();

  if (!currentUserProgress) {
    throw new Error("User progress not found");
  }

  if (currentUserProgress.hearts === 5) {
    throw new Error("Hearts already full");
  }

  if (currentUserProgress.points < POINTS_TO_REFILL_HEARTS) {
    throw new Error("Insufficient points");
  }

  await db
    .update(userProgress)
    .set({
      hearts: 5,
      points: currentUserProgress.points - POINTS_TO_REFILL_HEARTS,
    })
    .where(eq(userProgress.userId, currentUserProgress.userId));

  revalidatePath("/learn");
  revalidatePath("/quests");
  revalidatePath("/shop");
  revalidatePath("/leaderboard");
};
