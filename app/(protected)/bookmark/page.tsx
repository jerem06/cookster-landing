"use client";

import { useRecipeCategories } from "@/hooks/use-order-user-recipe";
import { useUserStore } from "@/lib/store/user-store";
import { useGetUserRecipes } from "@/services/api/protected/useGetUserRecipes";
import { Loader2 } from "lucide-react";

export default function BookmarkPage() {
  const { user_id } = useUserStore();

  const { data: recipes, isFetching } = useGetUserRecipes({ userId: user_id! });

  const categories = useRecipeCategories(recipes!);
  console.log("🚀 ~ BookmarkPage ~ categories:", categories);

  //const { data: recipes, isFetching } = useGetUserRecipes(user?.id);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Mes recettes</h1>
      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes?.length}
        </div>
      )}
    </div>
  );
}
