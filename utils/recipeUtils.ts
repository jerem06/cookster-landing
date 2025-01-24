import { Recipe, RecipeTranslation, TranslationMap, UserRecipe } from "@/app/api/datamodel";


export const getRecipeTranslation = (
  recipe: Recipe | null,
  lang: keyof TranslationMap<RecipeTranslation>
): RecipeTranslation | null => {
  if (!recipe) return null;
  const translation =
    recipe.translations[lang] || recipe.translations["en"] || null;

  // If translation exists, capitalize the first letter
  if (translation) {
    return {
      ...translation,
      title:
        translation.title.charAt(0).toUpperCase() + translation.title.slice(1),
    };
  }

  return null;
};

export const getUserRecipeTranslation = (
  recipe: UserRecipe | null,
  lang: keyof TranslationMap<RecipeTranslation>
): RecipeTranslation | null => {
  if (!recipe) return null;
  const translation =
    recipe.recipe.translations[lang] ||
    recipe.recipe.translations["en"] ||
    null;

  // If translation exists, capitalize the first letter
  if (translation) {
    return {
      ...translation,
      title:
        translation.title.charAt(0).toUpperCase() + translation.title.slice(1),
    };
  }

  return null;
};
