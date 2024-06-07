import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SideBarItem } from "..";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={cn(
        "flex  h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
        className
      )}
    >
      <Link href="/learn">
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image src="/pet.png" alt="Pet" height={40} width={40} />
          <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
            Linguify
          </h1>
        </div>
      </Link>

      <div className="flex flex-col gap-y-2 flex-1">
        <SideBarItem label="Learn" iconSrc="/learn.svg" href="/learn" />
        <SideBarItem
          label="Leaderboard"
          iconSrc="/leaderboard.svg"
          href="/leaderboard"
        />
        <SideBarItem label="Quests" iconSrc="/quests.svg" href="/quests" />
        <SideBarItem label="Shop" iconSrc="/shop.svg" href="/shop" />
      </div>

      <div className="p-4">
        <ClerkLoading>
          <Loader size={24} className="text-muted-foreground animate-spin " />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            appearance={{ elements: { avatarBox: { width: 50, height: 50 } } }}
            afterSignOutUrl="/"
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};
