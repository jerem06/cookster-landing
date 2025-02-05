"use client";

import React, { useState } from "react";
import SearchHeader from "./components/SearchHeader";
import heroRecipe from "@/app/assets/images/recipeHeader.jpg";
import Image from "next/image";
import { useGetRecipes } from "@/services/api";
import RecipeGrid from "./components/RecipeGrid";
import { useRouter } from "next/navigation";

const RecipePage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: recipes, isPending } = useGetRecipes(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Here you would typically filter recipes or make an API call
    console.log("Searching for:", query);
  };

  return (
    <div className="relative">
      <button
        onClick={() => router.push("/")}
        className="absolute mt-20 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
      >
        <span className="text-xl">←</span>
        <span>Back</span>
      </button>

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
        <RecipeGrid isFetching={isPending} recipes={recipes || []} />
      </div>
    </div>
  );
};

export default RecipePage;
