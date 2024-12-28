"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const LogoutButton = () => {
  const router = useRouter();

  return (
    <Button
      type="submit"
      className="mt-2 w-full"
      onClick={() => {
        signOut();
        router.push("/");
      }}
    >
      Abmelden
    </Button>
  );
};
