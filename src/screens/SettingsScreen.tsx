import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNutritionStore } from '@/store/nutritionStore';

export const SettingsScreen: React.FC = () => {
  const target = useNutritionStore((state) => state.target);
  const setTarget = useNutritionStore((state) => state.setTarget);

  const [calories, setCalories] = useState(target?.dailyCaloricTarget.toString() || '2000');
  const [protein, setProtein] = useState(target?.dailyProteinTarget.toString() || '75');
  const [carbs, setCarbs] = useState(target?.dailyCarbsTarget.toString() || '300');
  const [fat, setFat] = useState(target?.dailyFatTarget.toString() || '65');

  const handleSave = () => {
    if (target) {
      setTarget({
        ...target,
        dailyCaloricTarget: parseInt(calories),
        dailyProteinTarget: parseFloat(protein),
        dailyCarbsTarget: parseFloat(carbs),
        dailyFatTarget: parseFloat(fat),
      });
      alert('Settings saved!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutrition Targets</Text>
      </View>

      <View style={styles.section}>
        <SettingInput
          label="Daily Calories"
          value={calories}
          onChange={setCalories}
          unit="kcal"
        />
        <SettingInput
          label="Protein"
          value={protein}
          onChange={setProtein}
          unit="g"
        />
        <SettingInput label="Carbs" value={carbs} onChange={setCarbs} unit="g" />
        <SettingInput label="Fat" value={fat} onChange={setFat} unit="g" />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Targets</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

interface SettingInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  unit: string;
}

const SettingInput: React.FC<SettingInputProps> = ({
  label,
  value,
  onChange,
  unit,
}) => (
  <View style={styles.inputContainer}>
    <View style={styles.inputLabel}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.unit}>{unit}</Text>
    </View>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChange}
      keyboardType="decimal-pad"
      placeholder="0"
    />
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  unit: {
    fontSize: 12,
    color: '#9ca3af',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  saveButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#10b981',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
