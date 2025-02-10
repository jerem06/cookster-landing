"use client";
import RecipeGrid from "@/app/(public)/recipes/components/RecipeGrid";
import { useGetRecipes } from "@/services/api/protected/useGetRecipes";
import SearchHeader from "@/app/(public)/recipes/components/SearchHeader";
import { useState } from "react";
import Image from "next/image";
import heroRecipe from "@/app/assets/images/recipeHeader.jpg";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function CooksterRecipesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const { data, isFetching } = useGetRecipes({
    searchTerm: searchQuery,
    page: currentPage,
    pageSize,
  });

  const recipes = data?.recipes ?? [];
  const totalRecipes = data?.count ?? 0;
  const totalPages = Math.ceil(totalRecipes / pageSize);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          recipes={recipes}
          isProtected={true}
        />

        {/* Pagination Controls */}
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

                // Always show first page, current page, and last page
                // Show ellipsis for gaps
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
}
