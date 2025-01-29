"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  onSearch: (query: string) => void;
}

const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="relative z-10">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher une recette..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-lg"
        />
        <Button
          type="submit"
          size="icon"
          className="ml-[-40px] h-8 w-8 self-center"
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default SearchHeader;
