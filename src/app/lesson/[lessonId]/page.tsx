import { getLesson, getUserProgress, getUserSubscriptions } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../Quiz";

interface LessonIdPageProps {
  params: {
    lessonId: number;
  };
}

export default async function LessonIdPage({
  params: { lessonId },
}: LessonIdPageProps) {
  const lessonData = getLesson(lessonId);
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscriptions();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
    />
  );
}
