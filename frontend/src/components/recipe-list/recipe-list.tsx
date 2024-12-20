import dataFetch from "@/lib/data-fetch";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { RecipeData } from "@/app/page";
import { Container } from "../container/container";

// simulate delay funciton
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getRecipes() {
  // here we simulate a delay of 2 second
  await delay(2000);

  // here we call the dataFetch function from the lib
  // to get all the recipes from the backend
  return await dataFetch("http://127.0.0.1:8000/api/recipes");
}

export default async function RecipeList() {
  const recipes = await getRecipes();

  return (
    <>
      <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe: RecipeData) => (
          // here we use the Link Component from next.js
          // to enable routing whenever we click on an recipe
          <Link
            key={recipe.id}
            href={`/recipe/${recipe.id}`}
            className="flex flex-col text-clip rounded-md border border-border"
          >
            <div>
              <img
                src={`https://picsum.photos/800/600?random=${recipe.id}`}
                alt={recipe.title}
                className="aspect-[16/12] size-full object-cover object-center rounded-md"
              />
            </div>
            <div className="px-6 py-6">
              <h4 className="mb-3">{recipe.title}</h4>
              <p className="mb-3 text-muted-foreground md:mb-4 lg:mb-6">
                {recipe.content}
              </p>
              <p className="flex items-center hover:underline">Read more</p>
            </div>
          </Link>
        ))}
      </Container>
    </>
  );
}
