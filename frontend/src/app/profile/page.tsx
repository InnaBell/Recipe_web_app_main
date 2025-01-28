import { authConfig } from "@/auth";
import { dataFetchWithToken } from "@/lib/data-fetch";
import { getServerSession } from "next-auth";
import { UserData } from "../page";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/buttons/logout-button";
import { Container } from "@/components/container/container";

async function getUserProfile() {
  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      console.warn("Session not found");
      return [];
    }

    const user = await dataFetchWithToken(
      `${process.env.BACKEND_URL}/api/user`,
      session.accessToken
    );

    if (!user) {
      console.warn("User not found");
      return [];
    }

    console.log("User successfully fetched:", user);

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return [];
  }
}

export default async function ProfilePage() {
  const userProfile: UserData | null = await getUserProfile();

  if (!userProfile) {
    return (
      <div>
        <h1>Profile</h1>
        <p>Benutzerprofil kann nicht geladen werden.</p>
      </div>
    );
  }

  const avatarUrl = userProfile.profile.avatar
    ? `${process.env.BACKEND_URL}/${userProfile.profile.avatar}`
    : null;

  const avatarFallback = userProfile.email
    ? userProfile.email.charAt(0).toUpperCase()
    : "?";

  return (
    <section>
      <Container>
        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm px-6">
            <div className="mb-6 flex flex-col items-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="User's avatar"
                  className="mb-7 rounded-full w-32 h-32 object-cover"
                />
              ) : (
                <div className="mb-7 rounded-full w-32 h-32 bg-gray-300 flex items-center justify-center text-4xl font-bold text-white">
                  {avatarFallback}
                </div>
              )}
              <p className="mb-2 text-2xl font-bold">Benutzerprofil</p>
              <p className="mb-4 text-foreground text-center">
                {userProfile.email || "No email provided."}
              </p>
              <p className="text-muted-foreground text-center">
                {userProfile.profile.bio || "No bio provided."}
              </p>
            </div>
            <div>
              <div className="grid gap-2">
                <Button type="submit" className="mt-2 w-full">
                  Bearbeiten
                </Button>
                <LogoutButton />
                <Button
                  variant="destructive"
                  type="submit"
                  className="mt-2 w-full"
                >
                  Konto löschen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
