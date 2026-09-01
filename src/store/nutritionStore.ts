import { create } from 'zustand';
import type {
  DailyNutritionSummary,
  NutritionTarget,
} from '@/types/nutrition';
import type { Meal } from '@/types/meal';

interface NutritionStore {
  meals: Meal[];
  dailySummary: DailyNutritionSummary | null;
  target: NutritionTarget | null;
  selectedDate: string;

  setMeals: (meals: Meal[]) => void;
  addMeal: (meal: Meal) => void;
  removeMeal: (mealId: string) => void;
  updateMeal: (mealId: string, meal: Meal) => void;

  setDailySummary: (summary: DailyNutritionSummary) => void;
  setTarget: (target: NutritionTarget) => void;
  setSelectedDate: (date: string) => void;

  clear: () => void;
}

const initialState = {
  meals: [],
  dailySummary: null,
  target: null,
  selectedDate: new Date().toISOString().split('T')[0],
};

export const useNutritionStore = create<NutritionStore>((set) => ({
  ...initialState,

  setMeals: (meals) => set({ meals }),

  addMeal: (meal) =>
    set((state) => ({
      meals: [...state.meals, meal],
    })),

  removeMeal: (mealId) =>
    set((state) => ({
      meals: state.meals.filter((m) => m.id !== mealId),
    })),

  updateMeal: (mealId, meal) =>
    set((state) => ({
      meals: state.meals.map((m) => (m.id === mealId ? meal : m)),
    })),

  setDailySummary: (summary) => set({ dailySummary: summary }),

  setTarget: (target) => set({ target }),

  setSelectedDate: (date) => set({ selectedDate: date }),

  clear: () => set(initialState),
}));
