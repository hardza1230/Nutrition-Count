import type {
  NutritionData,
  NutritionTarget,
  DailyNutritionSummary,
  NutritionProgress,
} from '@/types/nutrition';

export const aggregateMealsNutrition = (meals: any[]): DailyNutritionSummary => {
  const summary: DailyNutritionSummary = {
    date: new Date().toISOString().split('T')[0],
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
    totalFiber: 0,
    totalSodium: 0,
    totalSugar: 0,
    mealCount: meals.length,
  };

  meals.forEach((meal) => {
    const nutrition = meal.nutritionalData;
    summary.totalCalories += nutrition.calories || 0;
    summary.totalProtein += nutrition.macros?.protein || 0;
    summary.totalCarbs += nutrition.macros?.carbs || 0;
    summary.totalFat += nutrition.macros?.fat || 0;
    summary.totalFiber += nutrition.fiber || 0;
    summary.totalSodium += nutrition.sodium || 0;
    summary.totalSugar += nutrition.sugar || 0;
  });

  return summary;
};

export const calculateNutritionProgress = (
  current: number,
  target: number,
  unit: string
): NutritionProgress => {
  const percentage = target > 0 ? (current / target) * 100 : 0;

  let status: 'good' | 'warning' | 'exceeded';
  if (percentage > 100) {
    status = 'exceeded';
  } else if (percentage > 80) {
    status = 'warning';
  } else {
    status = 'good';
  }

  return {
    nutrient: '',
    current,
    target,
    unit,
    percentage: Math.round(percentage),
    status,
  };
};

export const getNutritionProgressBars = (
  summary: DailyNutritionSummary,
  targets: NutritionTarget
): NutritionProgress[] => {
  return [
    {
      nutrient: 'Calories',
      current: summary.totalCalories,
      target: targets.dailyCaloricTarget,
      unit: 'kcal',
      percentage: Math.round(
        (summary.totalCalories / targets.dailyCaloricTarget) * 100
      ),
      status:
        summary.totalCalories > targets.dailyCaloricTarget
          ? 'exceeded'
          : summary.totalCalories / targets.dailyCaloricTarget > 0.8
            ? 'warning'
            : 'good',
    },
    {
      nutrient: 'Protein',
      current: summary.totalProtein,
      target: targets.dailyProteinTarget,
      unit: 'g',
      percentage: Math.round(
        (summary.totalProtein / targets.dailyProteinTarget) * 100
      ),
      status:
        summary.totalProtein < targets.dailyProteinTarget * 0.8
          ? 'exceeded'
          : summary.totalProtein / targets.dailyProteinTarget > 1.1
            ? 'warning'
            : 'good',
    },
    {
      nutrient: 'Carbs',
      current: summary.totalCarbs,
      target: targets.dailyCarbsTarget,
      unit: 'g',
      percentage: Math.round(
        (summary.totalCarbs / targets.dailyCarbsTarget) * 100
      ),
      status:
        summary.totalCarbs > targets.dailyCarbsTarget
          ? 'exceeded'
          : summary.totalCarbs / targets.dailyCarbsTarget > 0.8
            ? 'warning'
            : 'good',
    },
    {
      nutrient: 'Fat',
      current: summary.totalFat,
      target: targets.dailyFatTarget,
      unit: 'g',
      percentage: Math.round(
        (summary.totalFat / targets.dailyFatTarget) * 100
      ),
      status:
        summary.totalFat > targets.dailyFatTarget
          ? 'exceeded'
          : summary.totalFat / targets.dailyFatTarget > 0.8
            ? 'warning'
            : 'good',
    },
    {
      nutrient: 'Fiber',
      current: summary.totalFiber,
      target: targets.dailyFiberTarget,
      unit: 'g',
      percentage: Math.round(
        (summary.totalFiber / targets.dailyFiberTarget) * 100
      ),
      status:
        summary.totalFiber < targets.dailyFiberTarget * 0.8
          ? 'exceeded'
          : summary.totalFiber / targets.dailyFiberTarget > 1.1
            ? 'warning'
            : 'good',
    },
  ];
};

export const getStatusColor = (
  status: 'good' | 'warning' | 'exceeded'
): string => {
  switch (status) {
    case 'good':
      return '#10b981'; // green
    case 'warning':
      return '#f59e0b'; // orange
    case 'exceeded':
      return '#ef4444'; // red
    default:
      return '#6b7280'; // gray
  }
};
