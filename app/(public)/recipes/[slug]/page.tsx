"use client";
import { Recipe } from "@/app/api/datamodel";
import { RecipeDetails } from "@/app/components/recipe/RecipeDetails";
import { useGetRecipeById } from "@/services/api/useGetRecipeById";
import { notFound } from "next/navigation";
import { use } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function RecipePage({ params }: PageProps) {
  const unwrappedParams = use(params);
  const recipe_id = unwrappedParams.slug.split("_").pop();
  const { data: recipe, isPending } = useGetRecipeById({ id: recipe_id });

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!recipe) {
    notFound();
  }

  return <RecipeDetails recipe={recipe as Recipe} />;
}
