"use client";
import Image from "next/image";
import {
  ArrowLeft,
  PlayCircle,
  Bookmark,
  BookmarkCheck,
  Loader2,
} from "lucide-react";
import { getRecipeTranslation } from "@/utils/recipeUtils";
import {
  CategorySearchType,
  DietaryTagType,
  DifficultyType,
  Ingredient,
  IngredientUnit,
  Recipe,
  RecipeStep,
} from "@/app/api/datamodel";
import { getStepTranslation } from "@/utils/stepUtils";
import { getIngredientTranslation } from "@/utils/ingredientUtils";
import { formatCategorySearch, formatDietaryTag } from "@/utils/categoryUtils";
import { formatDifficulty } from "@/utils/difficultyUtils";
import { indexToTimeDuration } from "@/utils/timingUtils";
import { formatUnit } from "@/utils/unitUtils";
import imagePlaceholder from "@/app/assets/images/empty_ingredient.webp";
import { getEquipmentTranslation } from "@/utils/equipementUtils";
import { twMerge } from "tailwind-merge";
import { useUserStore } from "@/lib/store/user-store";

interface RecipeDetailsProps {
  recipe: Recipe;
  showBackButton?: boolean;
  onBack?: () => void;
  isBookmarked?: boolean;
  isBookmarkLoading?: boolean;
  onBookmarkToogle?: () => void;
}

export function RecipeDetails({
  recipe,
  showBackButton,
  onBack,
  isBookmarked = false,
  isBookmarkLoading,
  onBookmarkToogle,
}: RecipeDetailsProps) {
  const {
    difficulty,
    time,
    portions,
    category,
    dietary,
    equipments,
    ingredients,
    recipe_steps,
    image_url,
    recipe_url,
    author_id,
  } = recipe;

  const { user_id } = useUserStore();

  const isAuthor = author_id === user_id;

  return (
    <div className="container mx-auto px-4 max-w-4xl w-full">
      {/* Back Button */}
      {showBackButton && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Retour
        </button>
      )}

      {/* Hero Section with Image and Basic Info */}
      <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
        <Image
          src={image_url || imagePlaceholder}
          alt={getRecipeTranslation(recipe, "fr")?.title ?? ""}
          className="w-full h-full object-cover"
          width={800}
          height={384}
        />
        {!isAuthor && (
          <button
            onClick={onBookmarkToogle}
            disabled={isBookmarkLoading}
            className={twMerge(
              `p-1 absolute top-4 right-4 rounded-full hover:bg-gray-100 bg-background transition-colors ${
                isBookmarkLoading ? "opacity-50" : ""
              }`
            )}
          >
            {isBookmarkLoading ? (
              <Loader2 className="w-6 h-6 text-gray-500 animate-spin" />
            ) : isBookmarked ? (
              <BookmarkCheck className="w-6 h-6 text-blue-500" />
            ) : (
              <Bookmark className="w-6 h-6 text-gray-500" />
            )}
          </button>
        )}
      </div>

      {/* Title and Video Link Section */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">
            {getRecipeTranslation(recipe, "fr")?.title ?? ""}
          </h1>
        </div>
        {recipe_url && (
          <a
            href={recipe_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <PlayCircle className="w-5 h-5" />
            Voir la vidéo
          </a>
        )}
      </div>

      {/* Recipe Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <InfoCard
          title="Difficulté"
          value={
            formatDifficulty(difficulty as DifficultyType) || "Not specified"
          }
        />
        <InfoCard
          title="Temps"
          value={indexToTimeDuration(time as number) || "Not specified"}
        />
        <InfoCard title="Portions" value={`${portions} portions`} />
        <InfoCard
          title="Catégorie"
          value={
            formatCategorySearch(category as CategorySearchType) ||
            "Not specified"
          }
        />
      </div>

      {/* Dietary Tags */}
      {dietary && dietary.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Régimes alimentaires</h2>
          <div className="flex flex-wrap gap-2">
            {dietary.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
              >
                {formatDietaryTag(tag as DietaryTagType)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Equipment Section */}
      {equipments && equipments.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Équipement nécessaire</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {equipments.map((equipment) => (
              <div
                key={equipment.equipment_id}
                className="flex items-center gap-3"
              >
                <Image
                  src={equipment.image_url || imagePlaceholder}
                  alt={getEquipmentTranslation(equipment, "fr")?.name || ""}
                  className="w-12 h-12 object-cover rounded"
                  width={48}
                  height={48}
                />
                <span>{getEquipmentTranslation(equipment, "fr")?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ingredients Section */}
      {ingredients && ingredients.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Ingrédients</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.ingredient_id}
                className="flex flex-col justify-center items-center gap-3 p-3 bg-gray-50 rounded-lg"
              >
                <Image
                  src={ingredient.image_url || imagePlaceholder}
                  alt={"ingredient image"}
                  className="object-cover rounded"
                  width={130}
                  height={130}
                />

                <div className="flex flex-col items-center">
                  <span>
                    {ingredient.quantity}{" "}
                    {formatUnit(ingredient.unit as IngredientUnit | null)}{" "}
                  </span>
                  <span className="text-sm text-gray-500 text-center">
                    {
                      getIngredientTranslation(ingredient as Ingredient, "fr")
                        ?.name
                    }
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recipe Steps */}
      {recipe_steps && recipe_steps.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <div className="space-y-6">
            {recipe_steps
              .sort((a, b) => a.step_order - b.step_order)
              .map((step) => (
                <div key={step.step_id} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    {step.step_order}
                  </div>
                  <div>
                    <p className="text-gray-700">
                      {
                        getStepTranslation(step as RecipeStep, "fr")
                          ?.instructions
                      }
                    </p>
                    {step.ingredients && step.ingredients.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Ingrédients pour cette étape:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-600 ml-4">
                          {step.ingredients.map((ingredient) => (
                            <li key={ingredient.ingredient_id}>
                              {ingredient.quantity}{" "}
                              {ingredient.unit?.toLowerCase()}{" "}
                              {
                                getIngredientTranslation(
                                  ingredient as Ingredient,
                                  "fr"
                                )?.name
                              }
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Notes Section */}
      {getRecipeTranslation(recipe, "fr")?.note && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Notes</h2>
          <p className="text-gray-700">
            {getRecipeTranslation(recipe, "fr")?.note}
          </p>
        </div>
      )}
    </div>
  );
}

// Helper component for info cards
function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
