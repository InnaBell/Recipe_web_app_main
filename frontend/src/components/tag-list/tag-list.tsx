"use client";

import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";

interface TagsProps {
  onTagClick: (tagId: number) => void;
}

export const Tags = ({ onTagClick }: TagsProps) => {
  const [tags, setTags] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/tags/all");
        if (!response.ok) {
          throw new Error(`Failed to fetch tags: ${response.status}`);
        }
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTags();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-16 self-start cursor-pointer">
      {tags.map((tag) => (
        <Badge
          key={tag.id}
          variant={"destructive"}
          onClick={() => onTagClick(tag.id)}
        >
          # {tag.name}
        </Badge>
      ))}
    </div>
  );
};
