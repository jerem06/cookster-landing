"use client";
import { Recipe } from "@/app/api/datamodel";
import { RecipeDetails } from "@/app/components/recipe/RecipeDetails";
import { useGetRecipeById } from "@/services/api/useGetRecipeById";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export function ClientRecipePage({ params }: PageProps) {
  const recipe_id = params.slug.split("_").pop();
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

  return (
    <div className="mt-20">
      <RecipeDetails recipe={recipe as Recipe} isPublic />
    </div>
  );
}
