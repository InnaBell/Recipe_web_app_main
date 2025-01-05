"use client";

import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

export const HeaderAvatar = ({ containerClassName = "" }) => {
  // here we get the session and status from the useSession hook
  const { data: session, status } = useSession();

  // if the session is loading, we show a skeleton
  if (status === "loading") {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }

  // if there is no session show the login button
  return session === null ? (
    <Link
      href={"/session"}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal leading-none transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4"
    >
      Anmelden
    </Link>
  ) : (
    // if there is a session, show the cookbook link and the avatar
    <>
      <div className={`flex gap-x-9 ${containerClassName}`}>
        <Link
          href={"/recipes"}
          className="inline-flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors"
        >
          Kochbuch
        </Link>

        <Link
          href={"/favorites"}
          className="inline-flex items-center gap-x-1 text-sm/6 hover:text-primary transition-colors"
        >
          Favoriten
        </Link>

        <Link href={"/profile"}>
          <Avatar>
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </>
  );
};
