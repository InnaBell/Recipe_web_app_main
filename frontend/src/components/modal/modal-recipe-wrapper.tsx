"use client";

import { RecipeDetail } from "@/app/recipe/[id]/recipe-detail";
import { Modal } from "./modal";
import { RecipeData } from "@/app/page";
import { useState } from "react";

interface ModalRecipeWrapperProps {
  data: RecipeData;
  userId?: number;
}

export const ModalRecipeWrapper = ({
  data,
  userId,
}: ModalRecipeWrapperProps) => {
  const [openModal, setOpenModal] = useState(true);

  return (
    <Modal
      title={data.title}
      openModal={openModal}
      setOpenModal={setOpenModal}
      contentClassName="w-4/5 max-w-3xl max-h-[600px] sm:max-h-[800px] overflow-y-auto"
    >
      <RecipeDetail data={data} userId={userId} setOpenModal={setOpenModal} />
    </Modal>
  );
};
