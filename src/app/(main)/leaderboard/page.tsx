import { FeedWrapper, StickyWrapper, UserProgress } from "@/components";
import Promo from "@/components/promo/Promo";
import Quests from "@/components/quests/Quests";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscriptions,
} from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function LeaderboardPage() {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscriptions();
  const leaderboardData = getTopTenUsers();

  const [userProgress, userSubscription, leaderboard] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    leaderboardData,
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
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full fle flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="Leaderboard"
            width={90}
            height={90}
          />
          <h1 className="text-center text-neutral-800 font-bold text-2xl my-6">
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            See where you stand among other learners in the community
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderboard.map((user, index) => (
            <div
              className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
              key={user.userId}
            >
              <p className="font-bold text-lime-700 mr-4">{index + 1}</p>
              <Avatar className="border bg-green-500 h-12 w-12 ml-3 mr-6">
                <AvatarImage src={user.userImageSrc} />
              </Avatar>
              <p className="font-bold text-neutral-800 flex-1">
                {user.userName}
              </p>
              <p className=" text-muted-foreground">{user.points} XP</p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </div>
  );
}
