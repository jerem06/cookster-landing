import { LanguageType, RecipeStep, RecipeStepTranslation } from "@/app/api/datamodel";

export const getStepTranslation = (
  step: RecipeStep | RecipeStep,
  lang: LanguageType
): RecipeStepTranslation | null => {
  if (!step) return null;
  return step.translations[lang] || step.translations["en"] || null;
};
