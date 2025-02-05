import { use } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { ClientRecipePage } from "./ClientRecipePage";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Return basic metadata immediately
  const basicMetadata: Metadata = {
    title: "Recipe",
    openGraph: {
      title: "Recipe",
      images: [],
    },
  };

  try {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.split("_").pop();

    // Use Promise.all to parallelize the fetch and parent metadata resolution
    const [response, parentMetadata] = await Promise.all([
      fetch(`https://cookster.fr/api/recipes/${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }),
      parent,
    ]);

    const recipe = await response.json();

    if (!recipe) {
      return basicMetadata;
    }

    return {
      title: recipe.translations.fr.title,
      openGraph: {
        title: recipe.translations.fr.title,
        description: recipe.translations.fr.title,
        images: [recipe.image, ...(parentMetadata.openGraph?.images || [])],
      },
    };
  } catch (error) {
    console.error(error);
    return basicMetadata;
  }
}

export default function RecipePage({ params }: PageProps) {
  const unwrappedParams = use(params);
  return <ClientRecipePage params={unwrappedParams} />;
}
