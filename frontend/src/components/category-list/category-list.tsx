"use client";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  avatar?: string;
}

interface CategoryProps {
  onCategoryClick: (categoryId: number) => void;
}

export const CategoryList = ({ onCategoryClick }: CategoryProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/categories");
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 mb-16 self-start">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col w-[100px] cursor-pointer"
          onClick={() => onCategoryClick(category.id)}
        >
          <div className="mb-1 flex items-center justify-center">
            <img
              src={
                category.avatar
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${category.avatar}`
                  : `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/default-category-image.jpg`
              }
              alt={category.name}
              className="rounded-full w-12 h-12 object-cover"
            />
          </div>
          <h3 className="mb-2 text-sm font-medium text-center">
            {category.name}
          </h3>
        </div>
      ))}
    </div>
  );
};
