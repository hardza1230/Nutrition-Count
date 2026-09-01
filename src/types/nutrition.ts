export type Macros = {
  protein: number;
  carbs: number;
  fat: number;
};

export type Micronutrients = {
  [key: string]: number; // e.g., calcium, iron, vitamin_d, etc.
};

export type NutritionData = {
  calories: number;
  macros: Macros;
  micronutrients: Micronutrients;
  fiber: number;
  sodium: number;
  sugar: number;
};

export type NutritionTarget = {
  id: string;
  userId: string;
  dailyCaloricTarget: number;
  dailyProteinTarget: number;
  dailyCarbsTarget: number;
  dailyFatTarget: number;
  dailyFiberTarget: number;
  dailySodiumLimit: number;
  createdAt: string;
  updatedAt: string;
};

export type DailyNutritionSummary = {
  date: string;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  totalSodium: number;
  totalSugar: number;
  mealCount: number;
};

export type NutritionProgress = {
  nutrient: string;
  current: number;
  target: number;
  unit: string;
  percentage: number;
  status: 'good' | 'warning' | 'exceeded';
};
