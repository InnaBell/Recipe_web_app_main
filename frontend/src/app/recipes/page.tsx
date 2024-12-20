import { authConfig } from "@/auth";
import dataFetch, { dataFetchWithToken } from "@/lib/data-fetch";
import { getServerSession } from "next-auth";
import { RecipeData } from "../page";
import { PlusIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { LinkButton } from "@/components/buttons/link-button";
import Link from "next/link";

async function getUserRecipes() {
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

    const recipes = await dataFetch(
      `${process.env.BACKEND_URL}/api/recipes?user_id=${user.id}`
    );

    if (!recipes || recipes.length === 0) {
      console.warn("No recipes found for this user");
      return [];
    }

    return recipes;
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    return [];
  }
}

export default async function RecipesPage() {
  const data: RecipeData[] = (await getUserRecipes()) || [];

  return (
    <>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">My Recipes</h1>
        <LinkButton href={"/recipes/create"}>
          Create a new recipe <PlusIcon />
        </LinkButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {data.length > 0 ? (
          data.map((recipe) => (
            <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
              <Card className="p-6 h-56 cursor-pointer">
                <CardContent className="font-semibold">
                  {recipe.title}
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </>
  );
}

// Beispiel mit einem Image fetch aus dem backend
// return (
//   <div>
//     {data.map((recipe) => {
//       return (
//         <Fragment key={recipe.id}>
//           {recipe.cover_image.pathname && (
//             <Image
//               src={`${process.env.BACKEND_URL}/${recipe.cover_image.pathname}`}
//               alt=''
//               height={400}
//               width={200}
//             />
//           )}
//         </Fragment>
//       );
//     })}
//   </div>
// );
