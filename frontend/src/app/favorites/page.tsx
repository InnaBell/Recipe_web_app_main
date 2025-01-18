import { authConfig } from "@/auth";
import { dataFetchWithToken } from "@/lib/data-fetch";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Container } from "@/components/container/container";
import { Badge } from "@/components/ui/badge";
import { getFavouritesMap } from "@/utils/favourites-map";
import { FavoritesData } from "../page";

async function getUserFavorites() {
  try {
    const session = await getServerSession(authConfig);

    if (!session) {
      console.warn("Session not found");
      return [];
    }

    const response = await dataFetchWithToken(
      `${process.env.BACKEND_URL}/api/favourites`,
      session.accessToken
    );

    console.log("User favorites successfully fetched:", response);

    if (response && Array.isArray(response.favourites)) {
      return response.favourites; // we need just favourites
    } else {
      console.warn("Favorites are not in the expected format:", response);
      return [];
    }
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    return [];
  }
}

export default async function FavoritesPage() {
  const favorites: FavoritesData[] = (await getUserFavorites()) || [];

  const favouritesMap = await getFavouritesMap(
    favorites.map((favorite) => ({ id: favorite.recipe.id }))
  );

  return (
    <>
      <Container className="flex justify-between mb-8">
        <h2 className="font-extrabold underline">Meine Favoriten</h2>
      </Container>
      {favorites.length === 0 ? (
        <Container className="text-center py-10">
          <p className="text-lg text-gray-600">
            Sie haben noch keine Rezepte zu Ihren Favoriten hinzugefügt.
          </p>
        </Container>
      ) : (
        <Container className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((favorite) => (
            <Link
              key={favorite.recipe.id}
              href={`/recipe/${favorite.recipe.id}`}
              className="flex flex-col text-clip rounded-md border border-border"
            >
              <div>
                <img
                  src={
                    favorite.recipe.cover_image
                      ? `${process.env.BACKEND_URL}/${favorite.recipe.cover_image.pathname}`
                      : `${process.env.BACKEND_URL}/uploads/default-recipe-image.jpeg`
                  }
                  alt={favorite.recipe.title}
                  className="aspect-[12/13] size-full object-cover object-center rounded-md"
                />
              </div>

              <div className="flex flex-col justify-between px-6 py-6 h-full">
                <Badge className="mb-4 self-start">
                  {favorite.recipe.categories.length > 0
                    ? favorite.recipe.categories[0]?.name
                    : "New In"}
                </Badge>

                <h4 className="mb-6">{favorite.recipe.title}</h4>

                <div className="flex justify-between items-center text-foreground text-sm mt-auto">
                  {favorite.recipe.cooking_time && (
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 0C18.6276 0 24 5.3724 24 12C24 18.6276 18.6276 24 12 24C5.3724 24 0 18.6276 0 12C0 5.3724 5.3724 0 12 0ZM12 4.8C11.6817 4.8 11.3765 4.92643 11.1515 5.15147C10.9264 5.37652 10.8 5.68174 10.8 6V12C10.8001 12.3182 10.9265 12.6234 11.1516 12.8484L14.7516 16.4484C14.9779 16.667 15.281 16.7879 15.5957 16.7852C15.9103 16.7825 16.2113 16.6563 16.4338 16.4338C16.6563 16.2113 16.7825 15.9103 16.7852 15.5957C16.7879 15.281 16.667 14.9779 16.4484 14.7516L13.2 11.5032V6C13.2 5.68174 13.0736 5.37652 12.8485 5.15147C12.6235 4.92643 12.3183 4.8 12 4.8Z"
                          fill="#8ABD56"
                        />
                      </svg>
                      <span>{favorite.recipe.cooking_time} Min</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="22"
                      viewBox="0 0 24 22"
                      fill="none"
                    >
                      <path
                        d="M12 21.9083L10.3083 20.3683C4.30001 14.92 0.333344 11.315 0.333344 6.91667C0.333344 3.31167 3.15668 0.5 6.75001 0.5C8.78001 0.5 10.7283 1.445 12 2.92667C13.2717 1.445 15.22 0.5 17.25 0.5C20.8433 0.5 23.6667 3.31167 23.6667 6.91667C23.6667 11.315 19.7 14.92 13.6917 20.3683L12 21.9083Z"
                        fill="#EF4444"
                      />
                    </svg>
                    <span>{favouritesMap[favorite.recipe.id] ?? 0}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Container>
      )}
    </>
  );
}
