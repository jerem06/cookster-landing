import { LanguageType } from "@/app/api/datamodel";


const languageMap: Record<LanguageType, string> = {
  en: "English",
  fr: "Français",
};

/**
 * Formats a language code into its display name
 */
export const formatLanguage = (language: LanguageType): string => {
  return languageMap[language] || language || "";
};
