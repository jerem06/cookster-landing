import React from "react";
import Image from "next/image";
import Link from "next/link";
// You'll need to create this type
import { Skeleton } from "@/components/ui/skeleton";
import { Article } from "@/app/api/datamodel";

interface ArticleGridProps {
  articles: Article[];
  isFetching: boolean;
}

const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, isFetching }) => {
  const formatArticleSlug = (article: Article) => {
    const title = article.translations.fr.title;
    const normalizedTitle = title
      .normalize("NFD") // Decompose characters with accents
      .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove remaining special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();

    return `/articles/${normalizedTitle}_${article.id}`;
  };

  if (isFetching) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg overflow-hidden shadow-md"
          >
            <Skeleton className="w-full h-48" />
            <div className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-700">
          Pas d&apos;articles trouvés
        </h3>
        <p className="text-gray-500 mt-2">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-16">
      {articles.map((article) => {
        return (
          <Link
            href={formatArticleSlug(article)}
            key={article.id}
            className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={article?.image_url ?? ""}
                alt={article.translations.fr.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {article.translations.fr.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {article.translations.fr.content}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(article.created_at).toLocaleDateString()}
                </span>
                <span className="text-sm font-medium text-primary">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ArticleGrid;
