import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NutritionBar } from '@/components/NutritionBar';
import { MealCard } from '@/components/MealCard';
import { useNutrition } from '@/hooks/useNutrition';
import { useNutritionStore } from '@/store/nutritionStore';

export const DashboardScreen: React.FC = () => {
  const { todaysMeals, progressBars, updateDailySummary, dailySummary } =
    useNutrition();
  const setTarget = useNutritionStore((state) => state.setTarget);

  useEffect(() => {
    // Initialize default target
    setTarget({
      id: 'default',
      userId: 'user',
      dailyCaloricTarget: 2000,
      dailyProteinTarget: 75,
      dailyCarbsTarget: 300,
      dailyFatTarget: 65,
      dailyFiberTarget: 25,
      dailySodiumLimit: 2300,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    updateDailySummary();
  }, []);

  useEffect(() => {
    updateDailySummary();
  }, [todaysMeals]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Today's Nutrition</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
      </View>

      {dailySummary && (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Macros</Text>
            {progressBars.slice(0, 4).map((bar) => (
              <NutritionBar key={bar.nutrient} {...bar} />
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Meals</Text>
            {todaysMeals.length > 0 ? (
              todaysMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No meals logged yet</Text>
                <Text style={styles.emptySubtext}>
                  Take a photo to get started!
                </Text>
              </View>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

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
  date: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
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
});
