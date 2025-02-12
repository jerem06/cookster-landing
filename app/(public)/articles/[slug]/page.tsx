import { ClientArticlePage } from "./ClientArticlePage";
import { use } from "react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
/* 
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Return basic metadata immediately
  const basicMetadata: Metadata = {
    title: "Article",
    openGraph: {
      title: "Article",
      images: [],
    },
  };

  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.split("_").pop();

    // Use Promise.all to parallelize the fetch and parent metadata resolution
    const [response, parentMetadata] = await Promise.all([
      fetch(`https://cookster.fr/api/articles/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }),
      parent,
    ]);

    const article = await response.json();

    if (!article) {
      return basicMetadata;
    }

    return {
      title: article.translations.fr.title,
      openGraph: {
        title: `${article.translations.fr.title} | Cookster`,
        description: article.translations.fr.description,
        images: [article.image, ...(parentMetadata.openGraph?.images || [])],
      },
    };
  } catch (error) {
    console.error(error);
    return basicMetadata;
  }
} */

export default function ArticlePage({ params }: PageProps) {
  const unwrappedParams = use(params);
  return <ClientArticlePage params={unwrappedParams} />;
}
