-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  daily_calorie_target INTEGER DEFAULT 2000,
  daily_protein_target DECIMAL DEFAULT 75.0,
  daily_carbs_target DECIMAL DEFAULT 300.0,
  daily_fat_target DECIMAL DEFAULT 65.0,
  daily_fiber_target DECIMAL DEFAULT 25.0,
  daily_sodium_limit DECIMAL DEFAULT 2300.0
);

-- Create meals table
CREATE TABLE meals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  photo_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  meal_type VARCHAR(50) CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  nutritional_data JSONB NOT NULL,
  food_items_identified JSONB DEFAULT '[]'::jsonb
);

-- Create nutrition_targets table (for daily variations if needed)
CREATE TABLE nutrition_targets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  calorie_target INTEGER,
  macro_targets JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, date)
);

-- Create indexes for common queries
CREATE INDEX idx_meals_user_id ON meals(user_id);
CREATE INDEX idx_meals_created_at ON meals(created_at);
CREATE INDEX idx_meals_user_date ON meals(user_id, DATE(created_at));
CREATE INDEX idx_nutrition_targets_user_id ON nutrition_targets(user_id);
CREATE INDEX idx_nutrition_targets_date ON nutrition_targets(date);

-- Enable RLS (Row Level Security) if needed
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_targets ENABLE ROW LEVEL SECURITY;

-- Policies for users table
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

-- Policies for meals table
CREATE POLICY "Users can view their own meals"
  ON meals
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own meals"
  ON meals
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meals"
  ON meals
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meals"
  ON meals
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policies for nutrition_targets table
CREATE POLICY "Users can view their nutrition targets"
  ON nutrition_targets
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their nutrition targets"
  ON nutrition_targets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their nutrition targets"
  ON nutrition_targets
  FOR UPDATE
  USING (auth.uid() = user_id);
