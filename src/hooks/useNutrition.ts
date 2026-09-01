import { useCallback } from 'react';
import { useNutritionStore } from '@/store/nutritionStore';
import { aggregateMealsNutrition, getNutritionProgressBars } from '@/utils/calculations';
import type { Meal } from '@/types/meal';

export const useNutrition = () => {
  const { meals, dailySummary, target, selectedDate, setDailySummary, setMeals } =
    useNutritionStore();

  const updateDailySummary = useCallback(() => {
    if (meals.length > 0 && target) {
      const summary = aggregateMealsNutrition(meals);
      setDailySummary(summary);
    }
  }, [meals, target, setDailySummary]);

  const getProgressBars = useCallback(() => {
    if (!dailySummary || !target) {
      return [];
    }
    return getNutritionProgressBars(dailySummary, target);
  }, [dailySummary, target]);

  const getTodaysMeals = useCallback((): Meal[] => {
    const today = new Date().toISOString().split('T')[0];
    return meals.filter((meal) => meal.createdAt.split('T')[0] === today);
  }, [meals]);

  return {
    meals,
    dailySummary,
    target,
    selectedDate,
    todaysMeals: getTodaysMeals(),
    progressBars: getProgressBars(),
    updateDailySummary,
    setMeals,
  };
};
