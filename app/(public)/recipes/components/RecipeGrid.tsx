"use client";

import React from "react";
import Image from "next/image";
import { Recipe } from "@/app/api/datamodel";
import imagePlaceholder from "@/app/assets/images/empty_placeholder.webp";
import { indexToTimeDuration } from "@/utils";
import { getRecipeTranslation } from "@/utils/recipeUtils";
import { useRouter } from "next/navigation";
import { MonitorPlay } from "lucide-react";
// You'll need to create this type

interface RecipeGridProps {
  recipes: Recipe[];
  isFetching: boolean;
  isProtected?: boolean;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
  recipes,
  isFetching,
  isProtected,
}) => {
  const router = useRouter();

  const formatRecipeSlug = (recipe: Recipe) => {
    const title = getRecipeTranslation(recipe, "fr")?.title || "";
    const normalizedTitle = title
      .normalize("NFD") // Decompose characters with accents
      .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove remaining special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();

    if (isProtected) {
      return `/cookster/recipes/${normalizedTitle}_${recipe.recipe_id}`;
    } else {
      return `/recipes/${normalizedTitle}_${recipe.recipe_id}`;
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!recipes?.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        Aucune recette trouvée. Essayez une autre recherche.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {recipes.map((recipe) => (
        <div
          key={recipe.recipe_id}
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer h-[350px] flex flex-col"
          onClick={() => router.push(formatRecipeSlug(recipe))}
        >
          <div className="relative h-48 w-full">
            <Image
              src={recipe.image_url || imagePlaceholder}
              alt={"recipe image"}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4 flex flex-col flex-1 justify-between ">
            <h3 className="font-semibold text-lg">
              {getRecipeTranslation(recipe, "fr")?.title}
            </h3>
            <div className="flex items-center text-sm text-gray-500 justify-between">
              <span className="text">
                ⏱️ {indexToTimeDuration(recipe.time || 0)}
              </span>
              {recipe.recipe_url ? <MonitorPlay className="w-6 h-6" /> : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
