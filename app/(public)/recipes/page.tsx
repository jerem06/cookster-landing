"use client";

import React, { useState } from "react";
import SearchHeader from "./components/SearchHeader";
import heroRecipe from "@/app/assets/images/recipeHeader.jpg";
import Image from "next/image";

import RecipeGrid from "./components/RecipeGrid";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetRecipes } from "@/services/api/useGetRecipes";

const RecipePage: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const { data, isPending } = useGetRecipes({
    searchTerm: searchQuery,
    page: currentPage,
    pageSize,
  });

  const recipes = data?.recipes ?? [];
  const totalRecipes = data?.count ?? 0;
  const totalPages = Math.ceil(totalRecipes / pageSize);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        <RecipeGrid isFetching={isPending} recipes={recipes} />

        {totalPages > 1 && (
          <Pagination className="my-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;

                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  pageNumber === currentPage ||
                  (pageNumber === currentPage - 1 && pageNumber > 1) ||
                  (pageNumber === currentPage + 1 && pageNumber < totalPages)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={currentPage === pageNumber}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                } else if (
                  (pageNumber === 2 && currentPage > 3) ||
                  (pageNumber === totalPages - 1 &&
                    currentPage < totalPages - 2)
                ) {
                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }

                return null;
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
