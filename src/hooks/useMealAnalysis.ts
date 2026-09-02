import { useState, useCallback } from 'react';
import { analyzeMealImage } from '@/services/claudeVision';
import { uploadMealPhoto } from '@/services/storage';
import { useNutritionStore } from '@/store/nutritionStore';

export const useMealAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addMeal = useNutritionStore((state) => state.addMeal);

  const analyzeMeal = useCallback(
    async (base64: string, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' = 'lunch') => {
      setLoading(true);
      setError(null);

      try {
        // Analyze nutrition from image
        const analysisResult = await analyzeMealImage(base64);

        // Upload photo to Supabase
        const photoUrl = await uploadMealPhoto(base64, 'user-temp');

        // Create meal object
        const meal = {
          id: Math.random().toString(36).substr(2, 9),
          userId: 'user-temp',
          photoUrl,
          createdAt: new Date().toISOString(),
          mealType,
          nutritionalData: analysisResult.nutritionData,
          foodItemsIdentified: analysisResult.foodItems,
        };

        addMeal(meal);
        return meal;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to analyze meal';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [addMeal]
  );

  return { analyzeMeal, loading, error };
};
