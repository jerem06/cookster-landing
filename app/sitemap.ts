import type { MetadataRoute } from 'next'
import { Recipe } from './api/datamodel';


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {



    const baseUrl = 'https://cookster.fr'


    const response = await fetch(`${baseUrl}/api/recipes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const recipes = await response.json();

    const recipesSitemap = recipes.recipes.map((recipe: Recipe) => {
        const formatRecipeSlug = (recipe: Recipe) => {
            const title = recipe.translations.fr.title || "";
            const normalizedTitle = title
                .normalize("NFD") // Decompose characters with accents
                .replace(/[\u0300-\u036f]/g, "") // Remove accent marks
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, "") // Remove remaining special characters
                .replace(/\s+/g, "-") // Replace spaces with hyphens
                .trim();

            return `/recipes/${normalizedTitle}_${recipe.recipe_id}`;
        }

        return {
            url: `${baseUrl}${formatRecipeSlug(recipe)}`,
            lastModified: new Date(),
        }
    })


    return [
        {
            url: baseUrl,
            lastModified: new Date(),

        },
        ...recipesSitemap,

    ]
}