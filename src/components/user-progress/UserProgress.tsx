import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

interface UserProgressProps {
  activeCourse: typeof courses.$inferSelect;
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

export const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: UserProgressProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            className=" rounded-md border"
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500">
          <Image
            src="/points.svg"
            height={28}
            width={28}
            alt="points"
            className="mr-2"
          />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          <Image
            src="/heart.svg"
            height={22}
            width={22}
            alt="points"
            className="mr-2"
          />
          {hasActiveSubscription ? (
            <InfinityIcon className="stroke-[3]" size={22} />
          ) : (
            hearts
          )}
        </Button>
      </Link>
    </div>
  );
};
