import { FeedWrapper, StickyWrapper, UserProgress } from "@/components";
import { getUserProgress, getUserSubscriptions } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./Items";
import Promo from "@/components/promo/Promo";
import Quests from "@/components/quests/Quests";

export default async function ShopPage() {
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
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full fle flex-col items-center">
          <Image src="/shop.svg" alt="Shop" width={90} height={90} />
          <h1 className="text-center text-neutral-800 font-bold text-2xl my-6">
            Shop
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Spend your points on cool stuff in the shop.
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubscription={!!userSubscription?.isActive}
          />
        </div>
      </FeedWrapper>
    </div>
  );
}
