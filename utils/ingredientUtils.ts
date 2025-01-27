import { Ingredient, IngredientTranslation, TranslationMap } from "@/app/api/datamodel";


export const getIngredientTranslation = (
  ingredient: Ingredient | null,
  lang: keyof TranslationMap<IngredientTranslation>
): IngredientTranslation | null => {
  if (!ingredient) return null;
  const translation =
    ingredient.translations[lang] || ingredient.translations["en"] || null;

  // If translation exists, capitalize the first letter
  if (translation) {
    return {
      ...translation,
      name:
        translation.name.charAt(0).toUpperCase() + translation.name.slice(1),
    };
  }

  return null;
};
