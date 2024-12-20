import dataFetch, { dataFetchWithToken } from "@/lib/data-fetch";
import { RecipeDetail } from "./recipe-detail";
import { RecipeData } from "@/app/page";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth";

// this is needed for the dynamic route so that we can fetch
// a single recipe from the backend
// with the help of an id which we will get from the router
async function getRecipeDetail(id: number) {
  // here we call the dataFetch function from the lib
  // to get a single recipe from the backend
  return await dataFetch(`http://127.0.0.1:8000/api/recipes?id=${id}`);
}

// here we get the current logged in user
async function getCurrentUser() {
  const session = await getServerSession(authConfig);

  if (!session || !session.accessToken) {
    return null;
  }

  return await dataFetchWithToken(
    `${process.env.BACKEND_URL}/api/user`,
    session.accessToken
  );
}

// the params are being fetched from the router
// in this example we are on the route http://localhost:3000/recipe/1
export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  // here we await the id from the params
  // we need to await it, so there is no hydration error
  const { id } = await params;
  // here we call the getRecipeDetail function to get the data
  // and we pass the destructured params to it -> id
  const data: RecipeData = await getRecipeDetail(id);

  // here we get the current user
  const user = await getCurrentUser();

  return (
    <div>
      <RecipeDetail data={data} userId={user?.id} />
    </div>
  );
}
