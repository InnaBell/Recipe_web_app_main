"use client";

import {
  ProseMirrorNode,
  TipTapEditor,
} from "@/components/tiptap/tiptap-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { uploadImage } from "@/utils/image-upload";

export default function CreateRecipePage() {
  // state to hold the content of the TipTap editor
  const [editorContent, setEditorContent] = useState<
    ProseMirrorNode | undefined
  >(undefined);
  // state to hold the recipe title
  const [title, setTitle] = useState<string>("");
  // state to hold the cover image of the recipe
  const [coverImage, setCoverImage] = useState<File | undefined>();
  // useRouter hook for routing
  const router = useRouter();
  // define the maximum allowed size for the image file in MB
  const MAX_IMAGE_SIZE_MB = 8;

  // function to handle uploading an image to the server
  const handleImageUpload = async () => {
    if (!coverImage) return;

    const result = await uploadImage({
      file: coverImage,
      title,
      maxFileSizeMb: MAX_IMAGE_SIZE_MB,
    });
    if (result) {
      console.log("Image uploaded successfully:", result);
      return result;
    }
  };

  // function to handle creating the recipe
  const handleCreateRecipe = async () => {
    // rudimentary validation
    if (!editorContent || !title) {
      alert("Title and content are required");
    }

    // initialize the image ID as null
    let imageId = null;

    try {
      // call the handleImageUpload function
      const uploadedImageResponse = await handleImageUpload();

      // extract the image ID from the uploaded image data
      // safely access the iamge ID from the uploadedImageResponse
      imageId = uploadedImageResponse?.images[0].id || null;
    } catch (error) {
      console.error("Image upload failed: ", error);
      return;
    }

    // create a payload to send to the backend server
    const payload = {
      title, // recipe title
      content: editorContent, // the current state of the editorContant
      image_id: imageId, // the ID of the uploaded image
    };

    // now we send the payload to the backend via POST request in a API-Route-Handler
    // 1. try to create an api-route-handler with the name create-recipe
    // 2. inside that api-route-handler, we send the JSON to the route /api/recipes
    // 3. wenn die recipe creation nicht erfolgreich ist, sollte eine toast-message im catch erscheinen
    // 4. wenn das Rezept kriert ist, dann gibt es einen toat.success und einen router push auf /recipes
    try {
      // send the recipe data to the backend route-handler
      const response = await fetch("/api/create-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        toast.error("Recipe creation failed", { position: "bottom-center" });
        return;
      }

      //parse the json from the server
      await response.json().then(() => {
        toast.success("Recipe created successfully", {
          position: "bottom-center",
        });
        router.push("/recipes");
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create recipe", { position: "bottom-center" });
    }
  };

  return (
    <>
      <h1 className="font-bold text-3xl">Rezept erstellen</h1>
      {/* Input for the recipe title */}
      <Input
        placeholder="Recipe title"
        className="border-gray-600 mt-6"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <Input
        type="file"
        className="border-gray-600 mt-6"
        accept="image/*"
        onChange={(event) => setCoverImage(event.target.files?.[0])}
      />
      <TipTapEditor
        content={editorContent}
        onContentChange={setEditorContent}
      />
      {/* Submit button to create the recipe  */}
      <Button onClick={handleCreateRecipe}>Erstellen</Button>
    </>
  );
}
