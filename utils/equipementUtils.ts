import { Equipment, EquipmentTranslation, TranslationMap } from "@/app/api/datamodel";


export const getEquipmentTranslation = (
  equipment: Equipment | null,
  lang: keyof TranslationMap<EquipmentTranslation>
): EquipmentTranslation | null => {
  if (!equipment) return null;
  const translation =
    equipment.translations[lang] || equipment.translations["en"] || null;

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
