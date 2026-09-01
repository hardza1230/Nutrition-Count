import type { NutritionData } from './nutrition';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export type FoodItem = {
  name: string;
  portion: string;
  calories: number;
};

export type Meal = {
  id: string;
  userId: string;
  photoUrl: string;
  createdAt: string;
  mealType: MealType;
  nutritionalData: NutritionData;
  foodItemsIdentified: FoodItem[];
};

export type MealCreateInput = Omit<Meal, 'id' | 'userId' | 'createdAt'>;
