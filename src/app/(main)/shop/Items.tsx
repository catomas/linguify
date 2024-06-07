"use client";

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL_HEARTS } from "@/constants";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

interface ItemsProps {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
}

export const Items = ({
  hearts,
  points,
  hasActiveSubscription,
}: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL_HEARTS) {
      return;
    }

    startTransition(() => {
      refillHearts().catch(() => toast.error("Failed to refill hearts"));
    });
  };

  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((resp) => {
          if (resp.data) window.location.href = resp.data;
        })
        .catch(() => toast.error("Failed to create stripe url"));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
        <Image src="/heart.svg" height={60} width={60} alt="heart" />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Refil hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL_HEARTS}
        >
          {hearts === 5 ? (
            "Max"
          ) : (
            <div className="flex items-center">
              <Image src="/points.svg" height={20} width={20} alt="points" />
              <p>{POINTS_TO_REFILL_HEARTS}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
        <Image src="/unlimited.svg" height={60} width={60} alt="unlimited" />
        <div className="flex-1">
          <p className="text-neutral-700 text-base lg:text-xl font-bold">
            Unlimited hearts
          </p>
        </div>
        <Button onClick={onUpgrade} disabled={pending}>
          {hasActiveSubscription ? "Settings" : "Upgrade"}
        </Button>
      </div>
    </ul>
  );
};
