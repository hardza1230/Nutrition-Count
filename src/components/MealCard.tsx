import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { Meal } from '@/types/meal';

interface MealCardProps {
  meal: Meal;
  onPress?: () => void;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onPress }) => {
  const time = new Date(meal.createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: meal.photoUrl }} style={styles.image} />
      <View style={styles.content}>
        <View>
          <Text style={styles.type}>{meal.mealType.toUpperCase()}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={styles.nutrition}>
          <Text style={styles.calories}>
            {Math.round(meal.nutritionalData.calories)} cal
          </Text>
          <Text style={styles.macros}>
            P: {Math.round(meal.nutritionalData.macros.protein)}g
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1f2937',
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  nutrition: {
    alignItems: 'flex-end',
  },
  calories: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
  },
  macros: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
  },
});
