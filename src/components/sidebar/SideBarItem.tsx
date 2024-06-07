"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

interface SideBarItemProps {
  label: string;
  iconSrc: string;
  href: string;
}

export const SideBarItem = ({ label, iconSrc, href }: SideBarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      className=" justify-start h-[52px]"
      variant={isActive ? "sidebarOutline" : "sidebar"}
      asChild
    >
      <Link href={href}>
        <Image
          src={iconSrc}
          className="mr-5"
          alt={label}
          height={32}
          width={32}
        />
        {label}
      </Link>
    </Button>
  );
};
