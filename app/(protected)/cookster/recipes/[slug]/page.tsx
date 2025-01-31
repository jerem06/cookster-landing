"use client";
import { Recipe } from "@/app/api/datamodel";
import { RecipeDetails } from "@/app/components/recipe/RecipeDetails";
import { useUserStore } from "@/lib/store/user-store";
import { useGetIsRecipeBookmarked } from "@/services/api/protected/useGetIsRecipeBookmarked";
import { useUpdateBookmark } from "@/services/api/protected/useUpdateBookmark";
import { useGetRecipeById } from "@/services/api/useGetRecipeById";
import { notFound, useRouter } from "next/navigation";
import { use } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function RecipePage({ params }: PageProps) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const recipe_id = unwrappedParams.slug.split("_").pop();
  const { data: recipe, isFetching } = useGetRecipeById({ id: recipe_id });

  const { user_id } = useUserStore();

  const { data: isBookmarked, isFetching: isBookmarkedFetching } =
    useGetIsRecipeBookmarked({
      userId: user_id!,
      recipeId: recipe_id!,
    });

  const { mutate } = useUpdateBookmark();

  const toggleBookmark = () => {
    mutate({ userId: user_id!, recipeId: recipe_id! });
  };

  if (isFetching) {
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
    <RecipeDetails
      isBookmarked={isBookmarked}
      isBookmarkLoading={isBookmarkedFetching}
      onBookmarkToogle={toggleBookmark}
      recipe={recipe as Recipe}
      showBackButton
      onBack={() => router.back()}
    />
  );
}
