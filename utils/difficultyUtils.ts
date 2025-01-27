import { DifficultyType } from "@/app/api/datamodel";


const difficultyMap: Record<DifficultyType, string> = {
  EASY: "Facile",
  MEDIUM: "Normale",
  HARD: "Difficile",
};

export const formatDifficulty = (difficulty: DifficultyType | null): string => {
  if (!difficulty) return "";
  return difficultyMap?.[difficulty] || difficulty || "";
};
