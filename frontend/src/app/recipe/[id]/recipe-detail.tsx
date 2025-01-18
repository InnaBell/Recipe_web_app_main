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
                  <span>{data.cooking_time} Min</span>
                </div>
              )}

              <div className="flex items-center gap-2">
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
                className="max-w-[180px] mt-10"
                onClick={() => {
                  router.push(`/recipes/edit/${data.id}`);
                  setOpenModal?.(false);
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
