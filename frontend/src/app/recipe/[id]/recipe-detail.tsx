"use client";

import { RecipeData } from "@/app/page";
import { TipTapViewer } from "@/components/tiptap/tiptap-viewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getFavouritesMap } from "@/utils/favourites-map";

interface RecipeDataProps {
  data: RecipeData;
  userId?: number;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}

export function RecipeDetail({ data, userId, setOpenModal }: RecipeDataProps) {
  const [favouritesMap, setFavouritesMap] = useState<Record<number, number>>(
    {}
  );
  const router = useRouter();

  useEffect(() => {
    const fetchFavouritesMap = async () => {
      const favouritesData = [{ id: data.id }];
      const map = await getFavouritesMap(favouritesData);
      setFavouritesMap(map);
    };

    fetchFavouritesMap();
  }, [data.id]);

  let coverImage = null;
  let imageUrl = "";

  if (data.cover_image) {
    coverImage = data.cover_image.pathname;
    imageUrl = `http://127.0.0.1:8000/${coverImage}`;
  }

  return (
    <>
      <section>
        <div className="grid gap-8 lg:grid-cols-2">
          {coverImage !== null && (
            <div className="w-full h-auto aspect-w-16 aspect-h-9">
              <Image
                src={imageUrl}
                alt={data.title}
                layout="responsive"
                width={16}
                height={9}
                className="object-cover rounded-md"
              />
            </div>
          )}

          <div className="flex flex-col text-left">
            <Badge className="mb-4 self-start">
              {data.categories.length > 0 ? data.categories[0]?.name : "New In"}
            </Badge>

            <h1 className="font-extrabold mb-8">{data.title}</h1>

            <div className="flex items-center gap-6 mb-8">
              {data.cooking_time && (
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
                  <span>{data.cooking_time} Min</span>
                </div>
              )}

              <div className="flex items-center gap-1">
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
                <span>{favouritesMap[data.id] ?? 0}</span>
              </div>
            </div>

            <TipTapViewer content={data.content} />

            <div className="flex flex-wrap gap-2 mt-4 self-start cursor-pointer">
              {data.tags.map((tag) => (
                <Badge key={tag.id} variant={"destructive"}>
                  # {tag.name}
                </Badge>
              ))}
            </div>

            {userId === data.user_id && (
              <Button
                className="max-w-[180px] mt-8"
                onClick={() => {
                  router.push(`/recipes/edit/${data.id}`);
                  if (setOpenModal) setOpenModal(false);
                }}
              >
                Bearbeiten
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
