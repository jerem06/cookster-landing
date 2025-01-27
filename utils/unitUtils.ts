import { Ingredient, IngredientType, IngredientUnit } from "@/app/api/datamodel";

/**
 * Returns available units based on ingredient category
 * @param category The ingredient category
 * @returns Array of valid units for the given category
 */
export const getAvailableUnitsForCategory = (
  category: IngredientType | null
): IngredientUnit[] => {
  if (!category) return [];
  switch (category) {
    case "ONLY_LIQUID":
      return ["ML", "L", "TSP", "TBSP"];

    case "POWDER_GRANULE":
      return ["G", "KG", "TSP", "TBSP", "PINCH"];

    case "COUNTABLE_SOLID":
      return ["G", "KG", "PIECE"];

    case "NON_COUNTABLE_SOLID":
      return ["G", "KG"];

    default:
      return ["G", "KG"] as IngredientUnit[];
  }
};

const unitMap: Record<IngredientUnit, string> = {
  ML: "ml",
  L: "L",
  TSP: "Cuillère à café",
  TBSP: "Cuillère à soupe",
  G: "g",
  KG: "kg",
  PIECE: "Pièce",
  PINCH: "Pincée",
};

export const formatUnit = (unit: IngredientUnit | null): string => {
  if (!unit) return "";
  return unitMap[unit] || unit || "";
};

const roundToSignificantDigits = (value: number): number => {
  if (value >= 100) {
    // Round to whole numbers for large quantities
    return Math.round(value);
  } else if (value >= 10) {
    // Round to 1 decimal place for medium quantities
    return Math.round(value * 10) / 10;
  } else {
    // Round to 2 decimal places for small quantities
    return Math.round(value * 100) / 100;
  }
};

export const getConvertedQuantity = (
  ingredient: Ingredient,
  portionMultiplier: number
): { quantity: number; unit: IngredientUnit } => {
  const newQuantity = ingredient.quantity! * portionMultiplier;
  const { unit = "G" } = ingredient;

  // Only convert metric measurements
  switch (unit) {
    case "ML":
      if (newQuantity >= 1000) {
        return {
          quantity: roundToSignificantDigits(newQuantity / 1000),
          unit: "L",
        };
      }
      break;
    case "L":
      if (newQuantity < 1) {
        return {
          quantity: roundToSignificantDigits(newQuantity * 1000),
          unit: "ML",
        };
      }
      break;
    case "G":
      if (newQuantity >= 1000) {
        return {
          quantity: roundToSignificantDigits(newQuantity / 1000),
          unit: "KG",
        };
      }
      break;
    case "KG":
      if (newQuantity < 1) {
        return {
          quantity: roundToSignificantDigits(newQuantity * 1000),
          unit: "G",
        };
      }
      break;
  }

  return { quantity: roundToSignificantDigits(newQuantity), unit };
};
