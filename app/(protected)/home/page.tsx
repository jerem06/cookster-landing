"use client";

import RecipeGrid from "@/app/(public)/recipes/components/RecipeGrid";
import { useGetRecipes } from "@/services/api/protected/useGetRecipes";

export default function HomePage() {
  const { data: recipes = [], isFetching } = useGetRecipes("", true);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Cookster</h1>
      <h2 className="text-2xl font-bold mb-4">Les recettes de la semaine</h2>

      <RecipeGrid
        recipes={recipes}
        isFetching={isFetching}
        isProtected={true}
      />
    </div>
  );
}
