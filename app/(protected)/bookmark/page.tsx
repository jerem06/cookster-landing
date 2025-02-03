"use client";

import { UserRecipe } from "@/app/api/datamodel";
import { useRecipeCategories } from "@/hooks/use-order-user-recipe";
import { useUserStore } from "@/lib/store/user-store";
import { useGetUserRecipes } from "@/services/api/protected/useGetUserRecipes";
import { getUserRecipeTranslation } from "@/utils/recipeUtils";
import { Loader2, MonitorPlay, Flag } from "lucide-react";
import Image from "next/image";
import { indexToTimeDuration } from "@/utils";
import imagePlaceholder from "@/app/assets/images/empty_placeholder.webp";
import { useRouter } from "next/navigation";

export default function BookmarkPage() {
  const { user_id } = useUserStore();
  const router = useRouter();

  const { data: recipes, isFetching } = useGetUserRecipes({ userId: user_id! });

  const categories = useRecipeCategories(recipes!);

  const categoryConfigs = [
    { key: "recentRecipes", title: "Ajoutés récemment" },
    { key: "BREAKFAST", title: "Petits déjeuners" },
    { key: "LUNCH", title: "Déjeuners" },
    { key: "DESSERT", title: "Desserts" },
    { key: "BEVERAGE", title: "Boissons" },
    { key: "SNACK", title: "Snacks" },
    { key: "BRUNCH", title: "Brunch" },
    /*  { key: "UNCATEGORIZED", title: "Uncategorized" }, */
  ];

  if (!isFetching && !recipes?.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Mes recettes</h1>
        <p className="text-lg">
          Vous n&apos;avez pas encore ajouté de recettes à vos favoris.
        </p>
      </div>
    );
  }

  //const { data: recipes, isFetching } = useGetUserRecipes(user?.id);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Mes recettes</h1>
      {isFetching ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          {categoryConfigs.map((config) => {
            const categoryRecipes = categories[config.key];
            if (!categoryRecipes?.length) return null;

            return (
              <div key={config.key}>
                <h2 className="text-xl font-semibold mb-4">{config.title}</h2>
                <div className="overflow-x-auto">
                  <div className="flex space-x-4 pb-4">
                    {categoryRecipes.map((recipe: UserRecipe) => {
                      const formatRecipeSlug = (recipe: UserRecipe) => {
                        const title =
                          getUserRecipeTranslation(recipe, "fr")?.title || "";
                        const normalizedTitle = title
                          .normalize("NFD") // Decompose characters with accents
                          .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
                          .toLowerCase()
                          .replace(/[^a-z0-9\s-]/g, "") // Remove remaining special characters
                          .replace(/\s+/g, "-") // Replace spaces with hyphens
                          .trim();

                        return `/cookster/recipes/${normalizedTitle}_${recipe.recipe_id}`;
                      };

                      return (
                        <div
                          key={recipe.recipe_id}
                          className="flex-shrink-0 w-72 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer h-[350px] flex flex-col"
                          onClick={() => router.push(formatRecipeSlug(recipe))}
                        >
                          <div className="relative h-48 w-full">
                            <Image
                              src={recipe.recipe.image_url || imagePlaceholder}
                              alt={"recipe image"}
                              fill
                              className="object-cover"
                            />
                            {recipe.to_try && (
                              <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-2">
                                <Flag className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div className="p-4 flex flex-col flex-1 justify-between">
                            <h3 className="font-semibold text-lg">
                              {getUserRecipeTranslation(recipe, "fr")?.title}
                            </h3>
                            <div className="flex items-center text-sm text-gray-500 justify-between">
                              <span className="text-lg">
                                ⏱️{" "}
                                {indexToTimeDuration(recipe.recipe.time || 0)}
                              </span>
                              {recipe.recipe.recipe_url ? (
                                <MonitorPlay className="w-6 h-6" />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
