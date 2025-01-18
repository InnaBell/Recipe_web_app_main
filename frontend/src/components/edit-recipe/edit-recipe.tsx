"use client";

import { RecipeData } from "@/app/page";
import { ProseMirrorNode, TipTapEditor } from "../tiptap/tiptap-editor";
import { useState, useRef } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Image from "next/image";
import { uploadImage } from "@/utils/image-upload";

interface EditRecipeProps {
  data: RecipeData;
}

export const EditRecipe = ({ data }: EditRecipeProps) => {
  // get the recipe content from the data
  const [editorContent, setEditorContent] = useState<
    ProseMirrorNode | undefined
  >(JSON.parse(data.content));
  // get the recipe title from the data
  const [title, setTitle] = useState<string>(data.title);

  const [imagePreview, setImagePreview] = useState<string>(
    data.cover_image?.pathname
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${data.cover_image.pathname}`
      : ""
  );
  const [newImage, setNewImage] = useState<File | null>(null); // For newly selected image

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  // define the maximum allowed size for the image file in MB
  const MAX_IMAGE_SIZE_MB = 8;
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file); // Save the file for upload later
      setImagePreview(URL.createObjectURL(file)); // Show preview of the new image
    }
  };

  // function to handle uploading an image to the server
  const handleImageUpload = async () => {
    if (!newImage) return;
    const result = await uploadImage({
      file: newImage,
      title,
      maxFileSizeMb: MAX_IMAGE_SIZE_MB,
    });
    if (result) {
      return result;
    }
  };

  // function to handle creating the recipe
  const handleEditRecipe = async () => {
    // rudimentary validation
    if (!editorContent || !title) {
      alert("Title and content are required");

      return;
    }

    let imageId = data.cover_image?.id || null;
    // If there's a new image selected, handle image upload
    if (newImage) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("files[]", newImage);
      try {
        // Delete the old image if there is one
        if (data.image_id && newImage) {
          await fetch("/api/delete-image", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: data.cover_image.id,
            }),
          });
        }

        // call the handleImageUpload function
        const uploadedImageResponse = await handleImageUpload();
        if (!uploadedImageResponse) {
          toast.error("Failed to upload image", { position: "bottom-center" });
          return;
        }

        // extract the image ID from the uploaded image data
        // safely access the iamge ID from the uploadedImageResponse
        imageId = uploadedImageResponse?.images[0].id || null;
      } catch (error) {
        console.error(error);
        toast.error("Failed to upload image", { position: "bottom-center" });
        return;
      }
    }

    // create a payload to send to the backend server
    const payload = {
      id: data.id,
      title, // recipe title
      content: editorContent, // the current state of the editorContant
      image_id: imageId, // the ID of the uploaded image
    };

    // now we send the payload to the backend via POST request in a API-Route-Handler
    // 1. try to create an api-route-handler with the name create-recipe
    // 2. inside that api-route-handler, we send the JSON to the route /api/recipes
    // 3. wenn die recipe creation nicht erfolgreich ist, sollte eine toast-message im catch erscheinen
    // 4. wenn der Artikel kriert ist, dann gibt es einen toat.success und einen router push auf /recipes
    try {
      // send the recipe data to the backend route-handler
      const response = await fetch("/api/edit-recipe", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Recipe update failed", { position: "bottom-center" });
        return;
      }

      await response.json();
      toast.success("Recipe updated successfully", {
        position: "bottom-center",
      });
      router.push("/recipes");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update recipe", { position: "bottom-center" });
    }
  };

  return (
    <div>
      <h1 className="font-bold text-3xl">Rezept bearbeiten</h1>
      {/* Input for the recipe title */}
      <Input
        placeholder="Recipe title"
        className="border-gray-600 mt-6"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      {/* Display current image from the database */}
      {imagePreview && (
        <div className="mt-4 relative w-full aspect-video">
          <Image
            src={imagePreview}
            alt="Cover Image Preview"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      )}
      {/* File input for new image */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageChange}
      />
      <Button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="mt-4"
      >
        Neues Bild hochladen
      </Button>

      <TipTapEditor
        content={editorContent}
        onContentChange={setEditorContent}
      />
      <Button onClick={handleEditRecipe} className="mt-4">
        Bearbeiten
      </Button>
    </div>
  );
};
