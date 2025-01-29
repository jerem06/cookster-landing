"use client";
import RecipeGrid from "@/app/(public)/recipes/components/RecipeGrid";
import { useGetRecipes } from "@/services/api/protected/useGetRecipes";

export default function CooksterRecipesPage() {
  const { data: recipes, isFetching } = useGetRecipes();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Les recettes de Cookster</h1>
      <RecipeGrid isFetching={isFetching} recipes={recipes || []} />
    </div>
  );
}
