export type CategoryType =
    | "BREAKFAST"
    | "LUNCH"
    | "DESSERT"
    | "BEVERAGE"
    | "SNACK"
    | "BRUNCH";

export type CategorySearchType =
    | CategoryType
    | "recentRecipes"
    | "UNCATEGORIZED";

export type LanguageType = "en" | "fr";
export type DietaryTagType =
    | "VEGAN"
    | "VEGETARIAN"
    | "GLUTEN_FREE"
    | "LACTOSE_FREE"
    | "DAIRY_FREE";
export type DifficultyType = "EASY" | "MEDIUM" | "HARD";
export type IngredientUnit =
    | "ML"
    | "L"
    | "G"
    | "KG"
    | "TSP"
    | "TBSP"
    | "PINCH"
    | "PIECE";
export type IngredientType =
    | "ONLY_LIQUID"
    | "POWDER_GRANULE"
    | "COUNTABLE_SOLID"
    | "NON_COUNTABLE_SOLID";

export type RoleType = "ADMIN" | "USER" | "ABAMBASADOR";

export interface BaseTranslation {
    language_code: LanguageType;
}

export interface RecipeTranslation extends BaseTranslation {
    title: string;
    note: string | null;
}

export interface IngredientTranslation extends BaseTranslation {
    name: string;
}

export interface EquipmentTranslation extends BaseTranslation {
    name: string;
}

export interface RecipeStepTranslation extends BaseTranslation {
    instructions: string;
}

export type TranslationMap<T extends BaseTranslation> = {
    [key in LanguageType]: T;
};

export interface Recipe {
    author?: Pick<User, "user_id" | "display_name" | "picture_url">;
    recipe_id: string;
    recipe_url: string;
    author_id: number;
    category: CategoryType;
    portions: number;
    difficulty: DifficultyType | null;
    time: number | null;
    image_url: string | null;
    public: boolean;
    created_at: Date;
    dietary: DietaryTagType[];
    translations: TranslationMap<RecipeTranslation>;
    recipe_steps?: RecipeStep[];
    dietary_tags?: DietaryTagType[];
    ingredients?: Ingredient[];
    equipments?: Equipment[];
}

export interface Ingredient {
    image_url: string | null;
    ingredient_id: number;
    category: IngredientType | null;
    conversion_factor: number | null;
    translations: TranslationMap<IngredientTranslation>;
    quantity?: number;
    unit?: IngredientUnit;
}

export interface Equipment {
    equipment_id: number;
    equipment_url: string;
    image_url: string;
    translations: TranslationMap<EquipmentTranslation>;
}

export interface RecipeStep {
    step_id: number | null;
    recipe_id: number | null;
    step_order: number;
    translations: TranslationMap<RecipeStepTranslation>;
    ingredients?: RecipeStepIngredient[];
}

export interface RecipeStepIngredient extends Ingredient {
    quantity: number;
    unit: IngredientUnit;
}

export interface User {
    user_id: number;
    email: string;
    created_at: Date;
    supabase_id: string;
    display_name: string | null;
    picture_url: string | null;
    link: string | null;
    bio: string | null;
    user_role: RoleType;
}

export interface UserRecipe {
    list_id: number;
    user_id: number;
    recipe_id: number;
    added_at: Date;
    to_try: boolean;
    recipe: Recipe;
}

export interface ArticleCategoryTranslation extends BaseTranslation {
    name: string;
    description: string;
}

export interface ArticleCategory {
    id: number;
    category_order: number;
    translations: TranslationMap<ArticleCategoryTranslation>;
}

export interface ArticleTranslation extends BaseTranslation {
    title: string;
    content: string;
    meta_description: string;
    meta_title: string;
}

export interface Article {
    id: string;
    article_url: string;
    image_url: string | null;
    public: boolean;
    created_at: Date;
    updated_at: Date;
    translations: TranslationMap<ArticleTranslation>;
    categories?: ArticleCategory[];
}
