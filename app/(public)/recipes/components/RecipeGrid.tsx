"use client";

import React from "react";
import Image from "next/image";
import { Recipe } from "@/app/api/datamodel";
import imagePlaceholder from "@/app/assets/images/empty_placeholder.webp";
import { indexToTimeDuration } from "@/utils";
import { getRecipeTranslation } from "@/utils/recipeUtils";
import { useRouter } from "next/navigation";
// You'll need to create this type

interface RecipeGridProps {
  recipes: Recipe[];
  isFetching: boolean;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, isFetching }) => {
  const router = useRouter();

  const formatRecipeSlug = (recipe: Recipe) => {
    const title = getRecipeTranslation(recipe, "fr")?.title || "";
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();
    return `${slug}_${recipe.recipe_id}`;
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
          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => router.push(`/recipes/${formatRecipeSlug(recipe)}`)}
        >
          <div className="relative h-48 w-full">
            <Image
              src={recipe.image_url || imagePlaceholder}
              alt={"recipe image"}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">
              {getRecipeTranslation(recipe, "fr")?.title}
            </h3>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span>⏱️ {indexToTimeDuration(recipe.time || 0)} mins</span>
              <span className="mx-2">•</span>
              <span>👥 {recipe.portions} portions</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeGrid;
