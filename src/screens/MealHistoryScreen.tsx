import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MealCard } from '@/components/MealCard';
import { useNutritionStore } from '@/store/nutritionStore';
import { getTodaysMeals, deleteMeal as deleteMealApi } from '@/services/meals';
import { deleteMealPhoto } from '@/services/storage';
import type { Meal } from '@/types/meal';

export const MealHistoryScreen: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const removeMeal = useNutritionStore((state) => state.removeMeal);

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      setLoading(true);
      const todaysMeals = await getTodaysMeals('user-temp');
      setMeals(todaysMeals);
    } catch (error) {
      console.error('Load meals error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMeal = (meal: Meal) => {
    Alert.alert('Delete Meal?', 'This action cannot be undone.', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await deleteMealApi(meal.id);
            if (!meal.photoUrl.startsWith('data:')) {
              await deleteMealPhoto(meal.photoUrl);
            }
            removeMeal(meal.id);
            setMeals(meals.filter((m) => m.id !== meal.id));
            setSelectedMeal(null);
          } catch (error) {
            alert('Failed to delete meal');
          }
        },
        style: 'destructive' as const,
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal History</Text>
        <Text style={styles.subtitle}>
          {meals.length} meals today
        </Text>
      </View>

      {selectedMeal ? (
        <View style={styles.detailView}>
          <TouchableOpacity
            onPress={() => setSelectedMeal(null)}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <MealDetailView meal={selectedMeal} />

          <TouchableOpacity
            onPress={() => handleDeleteMeal(selectedMeal)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>🗑️ Delete Meal</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {loading ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : meals.length > 0 ? (
            meals.map((meal) => (
              <TouchableOpacity
                key={meal.id}
                onPress={() => setSelectedMeal(meal)}
              >
                <MealCard meal={meal} />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No meals logged</Text>
              <Text style={styles.emptySubtext}>
                Go to Add Meal to start tracking
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const MealDetailView: React.FC<{ meal: Meal }> = ({ meal }) => {
  const time = new Date(meal.createdAt).toLocaleTimeString();

  return (
    <ScrollView style={styles.detailContent}>
      <Text style={styles.detailTime}>{time}</Text>

      <View style={styles.detailSection}>
        <Text style={styles.detailSectionTitle}>Foods</Text>
        {meal.foodItemsIdentified.map((food, idx) => (
          <View key={idx} style={styles.foodItem}>
            <Text style={styles.foodName}>{food.name}</Text>
            <Text style={styles.foodPortion}>{food.portion}</Text>
            <Text style={styles.foodCals}>{food.calories} cal</Text>
          </View>
        ))}
      </View>

      <View style={styles.detailSection}>
        <Text style={styles.detailSectionTitle}>Nutrition</Text>
        <NutritionRow label="Calories" value={meal.nutritionalData.calories} unit="kcal" />
        <NutritionRow label="Protein" value={meal.nutritionalData.macros.protein} unit="g" />
        <NutritionRow label="Carbs" value={meal.nutritionalData.macros.carbs} unit="g" />
        <NutritionRow label="Fat" value={meal.nutritionalData.macros.fat} unit="g" />
        <NutritionRow label="Fiber" value={meal.nutritionalData.fiber} unit="g" />
        <NutritionRow label="Sodium" value={meal.nutritionalData.sodium} unit="mg" />
        <NutritionRow label="Sugar" value={meal.nutritionalData.sugar} unit="g" />
      </View>
    </ScrollView>
  );
};

const NutritionRow: React.FC<{ label: string; value: number; unit: string }> = ({
  label,
  value,
  unit,
}) => (
  <View style={styles.nutritionRow}>
    <Text style={styles.nutritionLabel}>{label}</Text>
    <Text style={styles.nutritionValue}>
      {Math.round(value)} {unit}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  loadingText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 20,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 8,
  },
  detailView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 12,
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  detailContent: {
    flex: 1,
  },
  detailTime: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  foodItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  foodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  foodPortion: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  foodCals: {
    fontSize: 13,
    fontWeight: '600',
    color: '#10b981',
    marginTop: 4,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#1f2937',
  },
  nutritionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});
