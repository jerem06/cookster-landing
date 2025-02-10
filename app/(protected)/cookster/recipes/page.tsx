"use client";
import RecipeGrid from "@/app/(public)/recipes/components/RecipeGrid";
import { useGetRecipes } from "@/services/api/protected/useGetRecipes";
import SearchHeader from "@/app/(public)/recipes/components/SearchHeader";
import { useState } from "react";
import Image from "next/image";
import heroRecipe from "@/app/assets/images/recipeHeader.jpg";

export default function CooksterRecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: recipes, isFetching } = useGetRecipes({
    searchTerm: searchQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="relative">
      <div className="relative h-[350px] w-full">
        <Image
          src={heroRecipe}
          alt="Recipe Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="container mx-auto lg:px-20 px-4">
        <div className="relative -mt-6">
          <SearchHeader onSearch={handleSearch} />
        </div>
        <RecipeGrid
          isFetching={isFetching}
          recipes={recipes || []}
          isProtected={true}
        />
      </div>
    </div>
  );
}
