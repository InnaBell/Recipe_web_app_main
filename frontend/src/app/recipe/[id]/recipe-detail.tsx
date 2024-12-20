"use client";

import { RecipeData } from "@/app/page";
import { TipTapViewer } from "@/components/tiptap/tiptap-viewer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

interface RecipeDataProps {
  data: RecipeData;
  userId?: number;
  setOpenModal?: Dispatch<SetStateAction<boolean>>;
}

export function RecipeDetail({ data, userId, setOpenModal }: RecipeDataProps) {
  // we initialize the coverImage variable to null
  let coverImage = null;
  let imageUrl = "";
  const router = useRouter();

  // if the cover_image is not null, we set the coverImage variable
  // to the pathname of the cover_image
  if (data.cover_image) {
    coverImage = data.cover_image.pathname;
    imageUrl = `http://127.0.0.1:8000/${coverImage}`;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-3">{data.title}</h1>
      {userId === data.user_id && (
        <Button
          className="max-w-[200px]"
          onClick={() => {
            router.push(`/recipes/edit/${data.id}`);
            if (setOpenModal) setOpenModal(false);
          }}
        >
          Edit recipe
        </Button>
      )}
      {coverImage !== null && (
        <div className="image-container">
          <Image
            src={imageUrl}
            alt={data.cover_image.pathname}
            fill
            objectFit="cover"
          />
        </div>
      )}
      <TipTapViewer content={data.content} />
    </>
  );
}
