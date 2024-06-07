import { FeedWrapper, StickyWrapper, UserProgress } from "@/components";
import Promo from "@/components/promo/Promo";
import { Progress } from "@/components/ui/progress";
import { quests } from "@/constants";
import { getUserProgress, getUserSubscriptions } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function QuestsPage() {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscriptions();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activateCourse) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activateCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
        {!userSubscription?.isActive && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full fle flex-col items-center">
          <Image src="/quests.svg" alt="Quests" width={90} height={90} />
          <h1 className="text-center text-neutral-800 font-bold text-2xl my-6">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete quests by earning points
          </p>
          <ul className="w-full">
            {quests.map((quest, index) => {
              const progress = (userProgress.points / quest.value) * 100;

              return (
                <div
                  key={quest.title}
                  className="flex items-center w-full p-4 gap-x-4 border-t-2"
                >
                  <Image
                    src="/points.svg"
                    alt="Points"
                    width={60}
                    height={60}
                  />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className=" text-neutral-700 text-xl font-bold">
                      {quest.title}
                    </p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
}
