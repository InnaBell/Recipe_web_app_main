import { FavoriteData } from "@/app/page";
import dataFetch from "@/lib/data-fetch";

// function to get the favourites count for each recipe
export async function getFavoriteCount(recipeId: number): Promise<number> {
  const response: FavoriteData = await dataFetch(
    `http://127.0.0.1:8000/api/favourites/count/${recipeId}`
  );
  return response.favourites_count;
}

export async function getFavouritesMap(
  recipes: { id: number }[]
): Promise<Record<number, number>> {
  const favouritesMap = (
    await Promise.all(
      recipes.map(async (recipe) => ({
        id: recipe.id,
        favourites_count: await getFavoriteCount(recipe.id),
      }))
    )
  ).reduce((acc, item) => {
    acc[item.id] = item.favourites_count;
    return acc;
  }, {} as Record<number, number>);

  return favouritesMap;
}
