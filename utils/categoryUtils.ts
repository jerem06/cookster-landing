import { CategorySearchType, CategoryType, DietaryTagType } from "@/app/api/datamodel";


const categoryMap: Record<CategoryType, string> = {
  BREAKFAST: `🍳 Petits déjeuners`,
  LUNCH: `🍽️ Déjeuners`,
  DESSERT: `🍰 Desserts`,
  BEVERAGE: `🥤 Boissons`,
  SNACK: `🥨 Snacks`,
  BRUNCH: `🥑 Déjeuners`,
};

export const formatCategory = (category: CategoryType | null): string => {
  if (!category) return "";
  return categoryMap[category] || category || "";
};

const dietaryTagMap: Record<DietaryTagType, string> = {
  VEGETARIAN: "Vegan",
  VEGAN: "Vegan",
  GLUTEN_FREE: "Gluten Free",
  LACTOSE_FREE: "Lactose Free",
  DAIRY_FREE: "Dairy Free",
};

export const formatDietaryTag = (dietaryTag: DietaryTagType): string => {
  return dietaryTagMap[dietaryTag] || dietaryTag || "";
};

const categorySearchMap: Record<CategorySearchType, string> = {
  recentRecipes: "Recipes récents",
  UNCATEGORIZED: "Non classé",
  BREAKFAST: "Petits déjeuners",
  LUNCH: "Déjeuners",
  DESSERT: "Desserts",
  BEVERAGE: "Boissons",
  SNACK: "Snacks",
  BRUNCH: "Déjeuners",
};

export const formatCategorySearch = (category: CategorySearchType): string => {
  return categorySearchMap[category] || category || "";
};
