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
      openModal={openModal}
      setOpenModal={setOpenModal}
      contentClassName="max-w-6xl max-h-[90vh] overflow-y-auto"
    >
      <RecipeDetail data={data} userId={userId} setOpenModal={setOpenModal} />
    </Modal>
  );
};
