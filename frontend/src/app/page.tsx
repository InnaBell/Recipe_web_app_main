import RecipeList from "@/components/recipe-list/recipe-list";
import { Container } from "@/components/container/container";
import { RecipeListSkeleton } from "@/components/skeletons/recipe-list-skeleton";
import { Suspense } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["800"],
  style: "italic",
});

export interface RecipeData {
  id: number;
  title: string;
  content: string;
  user_id: number;
  image_id: number;
  servings: number;
  cooking_time: number;
  created_at: string;
  updated_at: string;
  tags: string[];
  coverImageId: string | null;
  cover_image: {
    id: number;
    title: string;
    pathname: string;
  };
  categories: {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    pivot: {
      recipe_id: number;
      category_id: number;
    };
  }[];
}

export interface UserData {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  profile: {
    id: number;
    user_id: number;
    avatar: string;
    bio: string;
    created_at: string;
    updated_at: string;
  };
}

export interface FavoriteData {
  recipe_id: number;
  favourites_count: number;
}

export default async function Home() {
  return (
    <div>
      <Container className="text-center mb-16">
        <h1>
          Entdecke neue Rezepte und kreiere deine Lieblingsgerichte mit{" "}
          <span
            className={`${playfair.className} text-primary text-4xl italic font-extrabold lg:text-5xl`}
          >
            Cookie
          </span>
        </h1>
      </Container>

      <div>
        <Suspense fallback={<RecipeListSkeleton />}>
          <RecipeList />
        </Suspense>
      </div>
    </div>
  );
}
