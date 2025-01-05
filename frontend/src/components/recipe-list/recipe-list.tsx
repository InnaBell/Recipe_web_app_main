import dataFetch from "@/lib/data-fetch";
import Link from "next/link";
import { RecipeData, FavoriteData } from "@/app/page";
import { Container } from "../container/container";
import { Badge } from "@/components/ui/badge";

// simulate delay funciton
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getRecipes() {
  await delay(2000);
  return await dataFetch("http://127.0.0.1:8000/api/recipes");
}

export async function getFavoriteCount(recipeId: number): Promise<number> {
  const response: FavoriteData = await dataFetch(
    `http://127.0.0.1:8000/api/favourites/count/${recipeId}`
  );
  return response.favourites_count;
}

export default async function RecipeList() {
  const recipes = await getRecipes();

  // Map recipe IDs to favourite counts
  const favouritesMap = (
    await Promise.all(
      // to get all ids and favourites
      recipes.map(async (recipe: RecipeData) => ({
        id: recipe.id,
        favourites_count: await getFavoriteCount(recipe.id),
      }))
    )
  ).reduce((acc, item) => {
    // reduce the array to a single object
    acc[item.id] = item.favourites_count;
    return acc;
  }, {} as Record<number, number>); // types of objects

  return (
    <>
      <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe: RecipeData) => (
          <Link
            key={recipe.id}
            href={`/recipe/${recipe.id}`}
            className="flex flex-col text-clip rounded-md border border-border"
          >
            <div>
              <img
                src={
                  recipe.cover_image
                    ? `${process.env.BACKEND_URL}/${recipe.cover_image.pathname}`
                    : `${process.env.BACKEND_URL}/uploads/default-recipe-image.jpeg`
                }
                alt={recipe.title}
                className="aspect-[16/12] size-full object-cover object-center rounded-md"
              />
            </div>

            <div className="flex flex-col justify-between px-6 py-8 h-full">
              <Badge className="mb-6 self-start">
                {recipe.categories.length > 0
                  ? recipe.categories[0]?.name
                  : "New In"}
              </Badge>

              <h4 className="mb-6">{recipe.title}</h4>

              <div className="flex justify-between items-center text-foreground text-sm mt-auto">
                {recipe.cooking_time && (
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                    >
                      <path
                        d="M13.3333 0C20.6973 0 26.6667 5.96933 26.6667 13.3333C26.6667 20.6973 20.6973 26.6667 13.3333 26.6667C5.96933 26.6667 0 20.6973 0 13.3333C0 5.96933 5.96933 0 13.3333 0ZM13.3333 5.33333C12.9797 5.33333 12.6406 5.47381 12.3905 5.72386C12.1405 5.97391 12 6.31304 12 6.66667V13.3333C12.0001 13.6869 12.1406 14.026 12.3907 14.276L16.3907 18.276C16.6421 18.5189 16.9789 18.6533 17.3285 18.6502C17.6781 18.6472 18.0125 18.507 18.2598 18.2598C18.507 18.0125 18.6472 17.6781 18.6502 17.3285C18.6533 16.9789 18.5189 16.6421 18.276 16.3907L14.6667 12.7813V6.66667C14.6667 6.31304 14.5262 5.97391 14.2761 5.72386C14.0261 5.47381 13.687 5.33333 13.3333 5.33333Z"
                        fill="#8ABD56"
                      />
                    </svg>
                    <span>{recipe.cooking_time} Min</span>
                  </div>
                )}

                <div className="flex items-center gap-1 ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M16 28.4667L14.0667 26.7067C7.20002 20.48 2.66669 16.36 2.66669 11.3333C2.66669 7.21333 5.89335 4 10 4C12.32 4 14.5467 5.08 16 6.77333C17.4534 5.08 19.68 4 22 4C26.1067 4 29.3334 7.21333 29.3334 11.3333C29.3334 16.36 24.8 20.48 17.9334 26.7067L16 28.4667Z"
                      fill="#E4E4E7"
                    />
                  </svg>
                  <span>{favouritesMap[recipe.id] ?? 0}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Container>
    </>
  );
}
