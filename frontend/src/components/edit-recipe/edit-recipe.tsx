"use client";

import { RecipeData } from "@/app/page";
import { ProseMirrorNode, TipTapEditor } from "../tiptap/tiptap-editor";
import { useState } from "react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Rocket } from "lucide-react";

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
  const router = useRouter();

  // function to handle creating the recipe
  const handleEditRecipe = async () => {
    // rudimentary validation
    if (!editorContent || !title) {
      alert("Title and content are required");
    }

    // initialize the image ID as null
    const imageId = null;

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
    <div>
      <h1 className="font-bold text-3xl">Let your imagination run wild</h1>
      {/* Input for the recipe title */}
      <Input
        placeholder="Recipe title"
        className="border-gray-600 mt-6"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <TipTapEditor
        content={editorContent}
        onContentChange={setEditorContent}
      />
      <Button onClick={handleEditRecipe}>
        Edit Recipe <Rocket />
      </Button>
    </div>
  );
};
