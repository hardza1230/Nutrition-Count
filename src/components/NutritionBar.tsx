import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type { NutritionProgress } from '@/types/nutrition';

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'good':
      return '#10b981';
    case 'warning':
      return '#f59e0b';
    case 'exceeded':
      return '#ef4444';
    default:
      return '#6b7280';
  }
};

export const NutritionBar: React.FC<NutritionProgress> = ({
  nutrient,
  current,
  target,
  unit,
  percentage,
  status,
}) => {
  const barColor = getStatusColor(status);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${Math.min(percentage, 100)}%`, {
        duration: 800,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{nutrient}</Text>
        <Text style={styles.value}>
          {Math.round(current)}/{target} {unit}
        </Text>
      </View>
      <View style={styles.barBackground}>
        <Animated.View
          style={[styles.barFill, animatedStyle, { backgroundColor: barColor }]}
        />
      </View>
      <Text style={[styles.percentage, { color: barColor }]}>
        {percentage}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  value: {
    fontSize: 14,
    color: '#6b7280',
  },
  barBackground: {
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
  percentage: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});
