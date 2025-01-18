import { Container } from "@/components/container/container";
import { RecipeListPreview } from "@/components/recipe-list/recipe-list-preview";
import dataFetch from "@/lib/data-fetch";
import { getFavouritesMap } from "@/utils/favourites-map";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getRecipes() {
  await delay(2000);
  return await dataFetch("http://127.0.0.1:8000/api/recipes");
}

export default async function RecipeList() {
  const recipes = await getRecipes();
  const favouritesMap = await getFavouritesMap(recipes);

  return (
    <>
      <Container className="flex justify-between mb-8">
        <h2 className="font-extrabold underline">Rezepte suchen</h2>
      </Container>

      <RecipeListPreview recipes={recipes} favouritesMap={favouritesMap} />
    </>
  );
}
