import { getSupabase } from './supabase';
import type { Meal, MealCreateInput } from '@/types/meal';

export const saveMeal = async (meal: MealCreateInput, userId: string): Promise<Meal> => {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('meals')
      .insert([
        {
          user_id: userId,
          photo_url: meal.photoUrl,
          meal_type: meal.mealType,
          nutritional_data: meal.nutritionalData,
          food_items_identified: meal.foodItemsIdentified,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId,
      photoUrl: data.photo_url,
      createdAt: data.created_at,
      mealType: data.meal_type,
      nutritionalData: data.nutritional_data,
      foodItemsIdentified: data.food_items_identified,
    };
  } catch (error) {
    console.error('Save meal error:', error);
    throw error;
  }
};

export const getTodaysMeals = async (userId: string): Promise<Meal[]> => {
  try {
    const supabase = getSupabase();
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('meals')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', `${today}T00:00:00`)
      .lte('created_at', `${today}T23:59:59`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((meal: any) => ({
      id: meal.id,
      userId: meal.user_id,
      photoUrl: meal.photo_url,
      createdAt: meal.created_at,
      mealType: meal.meal_type,
      nutritionalData: meal.nutritional_data,
      foodItemsIdentified: meal.food_items_identified,
    }));
  } catch (error) {
    console.error('Get meals error:', error);
    throw error;
  }
};

export const deleteMeal = async (mealId: string): Promise<void> => {
  try {
    const supabase = getSupabase();

    const { error } = await supabase.from('meals').delete().eq('id', mealId);

    if (error) throw error;
  } catch (error) {
    console.error('Delete meal error:', error);
    throw error;
  }
};

export const updateMeal = async (
  mealId: string,
  updates: Partial<MealCreateInput>
): Promise<Meal> => {
  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('meals')
      .update(updates)
      .eq('id', mealId)
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      userId: data.user_id,
      photoUrl: data.photo_url,
      createdAt: data.created_at,
      mealType: data.meal_type,
      nutritionalData: data.nutritional_data,
      foodItemsIdentified: data.food_items_identified,
    };
  } catch (error) {
    console.error('Update meal error:', error);
    throw error;
  }
};
