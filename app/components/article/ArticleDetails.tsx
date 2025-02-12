"use client";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { Article } from "@/app/api/datamodel";
import imagePlaceholder from "@/app/assets/images/empty_ingredient.webp";

interface ArticleDetailsProps {
  article: Article;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function ArticleDetails({
  article,
  showBackButton,
  onBack,
}: ArticleDetailsProps) {
  const { image_url, created_at } = article;
  const title = article.translations.fr.title;
  const content = article.translations.fr.content;

  return (
    <div className="container mx-auto px-4 max-w-4xl w-full">
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Retour
        </button>
      )}

      {/* Hero Section with Image */}
      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <Image
          src={image_url || imagePlaceholder}
          alt={title}
          className="w-full h-full object-cover"
          width={800}
          height={384}
        />
      </div>

      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
          {created_at && (
            <span>
              {new Date(created_at).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Categories Section */}
      {article.categories && article.categories.length > 0 && (
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-3">Catégories</h2>
          <div className="flex flex-col  gap-2">
            {article.categories.map((category) => (
              <span
                key={category.id}
                className="bg-gray-100 px-3 py-1 rounded-full text-gray-700"
              >
                {category.translations.fr.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
