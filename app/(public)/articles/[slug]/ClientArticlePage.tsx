"use client";
import { Article } from "@/app/api/datamodel";
import { ArticleDetails } from "@/app/components/article/ArticleDetails";
import { useGetArticleById } from "@/services/api/useGetArticleById";

import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export function ClientArticlePage({ params }: PageProps) {
  const article_id = params.slug.split("_").pop();

  const { data: article, isPending } = useGetArticleById({ id: article_id });
  console.log("🚀 ~ ClientArticlePage ~ article:", article);

  if (isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="mt-20">
      {/* Replace with your ArticleDetails component */}
      <ArticleDetails article={article as Article} />
    </div>
  );
}
